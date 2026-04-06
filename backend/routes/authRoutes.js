const express = require('express');
const { register, login, getProfile, logout } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get current user profile (protected)
router.get('/profile', authenticateToken, getProfile);

// Logout route
router.post('/logout', logout);

module.exports = router;
