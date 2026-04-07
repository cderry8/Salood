const express = require('express');
const {
  getAvailableSlots,
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking
} = require('../controllers/bookingController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get available slots for a service (public)
router.get('/available-slots', getAvailableSlots);

// Create a new booking (authenticated users)
router.post('/', authenticateToken, createBooking);

// Get user's bookings (authenticated users)
router.get('/my-bookings', authenticateToken, getUserBookings);

// Get all bookings (admin only)
router.get('/admin/all', authenticateToken, requireAdmin, getAllBookings);

// Update booking status (admin only)
router.put('/:id/status', authenticateToken, requireAdmin, updateBookingStatus);

// Cancel booking (user or admin)
router.put('/:id/cancel', authenticateToken, cancelBooking);

module.exports = router;
