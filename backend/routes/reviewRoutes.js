const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { createReview, getPublicReviews } = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getPublicReviews);
router.post('/', authenticateToken, createReview);

module.exports = router;
