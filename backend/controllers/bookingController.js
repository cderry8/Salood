const Booking = require('../models/Booking');
const Service = require('../models/Service');
const AdminSchedule = require('../models/AdminSchedule');
const User = require('../models/User');

// Helper function to convert time string (HH:MM) to minutes since midnight
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper function to convert minutes since midnight to time string (HH:MM)
const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

// Helper function to get day name from date
const getDayName = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00Z');
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getUTCDay()];
};

// Helper function to get admin schedule (assumes single admin for now)
const getAdminSchedule = async () => {
  let schedule = await AdminSchedule.findOne();
  if (!schedule) {
    // Create default schedule if doesn't exist
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      throw new Error('No admin user found');
    }
    schedule = await AdminSchedule.create({
      admin: admin._id
    });
  }
  return schedule;
};

// Get available time slots for a service on a specific date
const getAvailableSlots = async (req, res) => {
  try {
    const { serviceId, date } = req.query;

    if (!serviceId || !date) {
      return res.status(400).json({
        success: false,
        message: 'Service ID and date are required'
      });
    }

    // Get service details
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Get admin schedule
    const adminSchedule = await getAdminSchedule();
    
    // Get day of week
    const dayName = getDayName(date);
    const daySchedule = adminSchedule.schedule[dayName];

    // Check if admin works on this day
    if (!daySchedule.isWorking) {
      return res.status(200).json({
        success: true,
        data: {
          slots: [],
          message: 'Not available on this day'
        }
      });
    }

    // Get working hours
    const startMinutes = timeToMinutes(daySchedule.startTime);
    const endMinutes = timeToMinutes(daySchedule.endTime);
    const slotDuration = adminSchedule.slotDuration;
    const serviceDuration = service.duration;

    // Generate all possible slots based on slot duration
    const allSlots = [];
    for (let time = startMinutes; time + serviceDuration <= endMinutes; time += slotDuration) {
      allSlots.push({
        startTime: minutesToTime(time),
        endTime: minutesToTime(time + serviceDuration)
      });
    }

    // Get existing bookings for this date and service
    const existingBookings = await Booking.find({
      service: serviceId,
      date: date,
      status: { $in: ['pending', 'confirmed'] }
    });

    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => {
      const slotStart = timeToMinutes(slot.startTime);
      const slotEnd = timeToMinutes(slot.endTime);

      return !existingBookings.some(booking => {
        const bookingStart = timeToMinutes(booking.startTime);
        const bookingEnd = timeToMinutes(booking.endTime);

        // Check if slots overlap
        return slotStart < bookingEnd && slotEnd > bookingStart;
      });
    });

    res.status(200).json({
      success: true,
      data: {
        slots: availableSlots,
        serviceDuration: service.duration
      }
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching available slots',
      error: error.message
    });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { serviceId, date, startTime, notes } = req.body;
    const userId = req.user.userId;

    // Validation
    if (!serviceId || !date || !startTime) {
      return res.status(400).json({
        success: false,
        message: 'Service ID, date, and start time are required'
      });
    }

    // Get service details
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Get admin schedule
    const adminSchedule = await getAdminSchedule();
    const dayName = getDayName(date);
    const daySchedule = adminSchedule.schedule[dayName];

    if (!daySchedule.isWorking) {
      return res.status(400).json({
        success: false,
        message: 'Service not available on this day'
      });
    }

    // Calculate end time
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = startMinutes + service.duration;
    const endTime = minutesToTime(endMinutes);

    // Check if time is within working hours
    const workStartMinutes = timeToMinutes(daySchedule.startTime);
    const workEndMinutes = timeToMinutes(daySchedule.endTime);

    if (startMinutes < workStartMinutes || endMinutes > workEndMinutes) {
      return res.status(400).json({
        success: false,
        message: 'Selected time is outside working hours'
      });
    }

    // Check for conflicts
    const conflictingBooking = await Booking.findOne({
      service: serviceId,
      date: date,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (conflictingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Time slot is already booked'
      });
    }

    // Create booking
    const booking = new Booking({
      user: userId,
      service: serviceId,
      date,
      startTime,
      endTime,
      totalPrice: service.price,
      notes: notes || ''
    });

    await booking.save();
    await booking.populate('user', 'firstName lastName email phone');
    await booking.populate('service', 'name price duration');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking
      }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking',
      error: error.message
    });
  }
};

// Get user's bookings
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const bookings = await Booking.find({ user: userId })
      .populate('service', 'name price duration image')
      .sort({ date: -1, startTime: -1 });

    res.status(200).json({
      success: true,
      data: {
        bookings
      }
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings',
      error: error.message
    });
  }
};

// Get all bookings (admin)
const getAllBookings = async (req, res) => {
  try {
    const { date, service, status } = req.query;
    const query = {};

    if (date) query.date = date;
    if (service) query.service = service;
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('user', 'firstName lastName email phone')
      .populate('service', 'name price duration')
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      data: {
        bookings
      }
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings',
      error: error.message
    });
  }
};

// Update booking status (admin)
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email phone')
      .populate('service', 'name price duration');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: {
        booking
      }
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating booking',
      error: error.message
    });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    const user = await User.findById(userId);
    if (booking.user.toString() !== userId && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    await booking.populate('user', 'firstName lastName email phone');
    await booking.populate('service', 'name price duration');

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: {
        booking
      }
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking',
      error: error.message
    });
  }
};

module.exports = {
  getAvailableSlots,
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking
};
