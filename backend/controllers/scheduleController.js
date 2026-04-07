const AdminSchedule = require('../models/AdminSchedule');
const User = require('../models/User');

// Get admin schedule
const getAdminSchedule = async (req, res) => {
  try {
    let schedule = await AdminSchedule.findOne();

    if (!schedule) {
      // Return default if not exists
      const admin = await User.findOne({ role: 'admin' });
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'No admin found'
        });
      }

      schedule = await AdminSchedule.create({
        admin: admin._id
      });
    }

    res.status(200).json({
      success: true,
      data: {
        schedule
      }
    });
  } catch (error) {
    console.error('Get schedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching schedule',
      error: error.message
    });
  }
};

// Update admin schedule
const updateAdminSchedule = async (req, res) => {
  try {
    const { schedule, slotDuration, timezone } = req.body;

    if (slotDuration && (slotDuration < 15 || slotDuration > 240)) {
      return res.status(400).json({
        success: false,
        message: 'Slot duration must be between 15 and 240 minutes'
      });
    }

    let adminSchedule = await AdminSchedule.findOne();
    const admin = await User.findOne({ role: 'admin' });

    if (!adminSchedule) {
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'No admin found'
        });
      }

      adminSchedule = new AdminSchedule({
        admin: admin._id
      });
    }

    // Update schedule
    if (schedule) {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      for (const day of days) {
        if (schedule[day]) {
          adminSchedule.schedule[day] = {
            isWorking: schedule[day].isWorking !== undefined ? schedule[day].isWorking : adminSchedule.schedule[day].isWorking,
            startTime: schedule[day].startTime || adminSchedule.schedule[day].startTime,
            endTime: schedule[day].endTime || adminSchedule.schedule[day].endTime
          };

          // Validate times
          if (adminSchedule.schedule[day].isWorking) {
            const [startH, startM] = adminSchedule.schedule[day].startTime.split(':').map(Number);
            const [endH, endM] = adminSchedule.schedule[day].endTime.split(':').map(Number);
            const startMin = startH * 60 + startM;
            const endMin = endH * 60 + endM;

            if (startMin >= endMin) {
              return res.status(400).json({
                success: false,
                message: `Invalid hours for ${day}: end time must be after start time`
              });
            }
          }
        }
      }
    }

    if (slotDuration) {
      adminSchedule.slotDuration = slotDuration;
    }

    if (timezone) {
      adminSchedule.timezone = timezone;
    }

    await adminSchedule.save();

    res.status(200).json({
      success: true,
      message: 'Schedule updated successfully',
      data: {
        schedule: adminSchedule
      }
    });
  } catch (error) {
    console.error('Update schedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating schedule',
      error: error.message
    });
  }
};

// Update single day schedule
const updateDaySchedule = async (req, res) => {
  try {
    const { day } = req.params; // Day comes from URL path
    const { isWorking, startTime, endTime } = req.body;

    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (!validDays.includes(day)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid day'
      });
    }

    let adminSchedule = await AdminSchedule.findOne();
    const admin = await User.findOne({ role: 'admin' });

    if (!adminSchedule) {
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'No admin found'
        });
      }

      adminSchedule = new AdminSchedule({
        admin: admin._id
      });
    }

    if (isWorking !== undefined) {
      adminSchedule.schedule[day].isWorking = isWorking;
    }

    if (startTime) {
      // Validate time format
      if (!/^\d{2}:\d{2}$/.test(startTime)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid time format. Use HH:MM'
        });
      }
      adminSchedule.schedule[day].startTime = startTime;
    }

    if (endTime) {
      // Validate time format
      if (!/^\d{2}:\d{2}$/.test(endTime)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid time format. Use HH:MM'
        });
      }
      adminSchedule.schedule[day].endTime = endTime;
    }

    // Validate times
    if (adminSchedule.schedule[day].isWorking) {
      const [startH, startM] = adminSchedule.schedule[day].startTime.split(':').map(Number);
      const [endH, endM] = adminSchedule.schedule[day].endTime.split(':').map(Number);
      const startMin = startH * 60 + startM;
      const endMin = endH * 60 + endM;

      if (startMin >= endMin) {
        return res.status(400).json({
          success: false,
          message: `Invalid hours for ${day}: end time must be after start time`
        });
      }
    }

    await adminSchedule.save();

    res.status(200).json({
      success: true,
      message: 'Day schedule updated successfully',
      data: {
        day,
        schedule: adminSchedule.schedule[day]
      }
    });
  } catch (error) {
    console.error('Update day schedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating day schedule',
      error: error.message
    });
  }
};

module.exports = {
  getAdminSchedule,
  updateAdminSchedule,
  updateDaySchedule
};
