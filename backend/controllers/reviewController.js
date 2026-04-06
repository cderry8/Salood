const Review = require('../models/Review');

const createReview = async (req, res) => {
  try {
    const { message, rating } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Review message is required'
      });
    }

    const parsedRating = Number(rating);
    if (rating !== undefined && (Number.isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5)) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be a number between 1 and 5'
      });
    }

    const review = await Review.create({
      user: req.user.userId,
      message: message.trim(),
      rating: rating === undefined ? 5 : parsedRating
    });

    const populatedReview = await Review.findById(review._id).populate('user', 'firstName lastName');

    return res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: {
        review: {
          id: populatedReview._id,
          name: `${populatedReview.user.firstName} ${populatedReview.user.lastName}`,
          role: 'Verified Client',
          text: populatedReview.message,
          rating: populatedReview.rating,
          createdAt: populatedReview.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Create review error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating review'
    });
  }
};

const getPublicReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isPublic: true })
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(9);

    const data = reviews.map((review) => ({
      id: review._id,
      name: `${review.user?.firstName || 'Client'} ${review.user?.lastName || ''}`.trim(),
      role: 'Verified Client',
      text: review.message,
      rating: review.rating,
      createdAt: review.createdAt
    }));

    return res.status(200).json({
      success: true,
      message: 'Reviews fetched successfully',
      data: { reviews: data }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching reviews'
    });
  }
};

module.exports = {
  createReview,
  getPublicReviews
};
