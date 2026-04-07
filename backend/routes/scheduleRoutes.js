const express = require('express');
const {
  getAdminSchedule,
  updateAdminSchedule,
  updateDaySchedule
} = require('../controllers/scheduleController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get admin schedule (public)
router.get('/', getAdminSchedule);

// Update entire schedule (admin only)
router.put('/', authenticateToken, requireAdmin, updateAdminSchedule);

// Update single day schedule (admin only)
router.put('/day/:day', authenticateToken, requireAdmin, updateDaySchedule);

module.exports = router;
