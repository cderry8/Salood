const express = require('express');
const { uploadServiceImage } = require('../controllers/uploadController');
const { serviceImageMiddleware } = require('../middleware/upload');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/service-image',
  authenticateToken,
  requireAdmin,
  serviceImageMiddleware,
  uploadServiceImage
);

module.exports = router;
