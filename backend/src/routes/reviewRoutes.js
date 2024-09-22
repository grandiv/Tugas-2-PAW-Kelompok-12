const express =  require('express');
const reviewRouter = express.Router();
const { authenticateToken } = require ('../middlewares/authMiddleware');

const {
  createReview,
  updateReview,
  getMovieReviews,
  deleteReview
} = require('../controllers/reviewControllers');

reviewRouter.post("/", authenticateToken, createReview);
reviewRouter.get("/movie/:id", getMovieReviews);
reviewRouter.patch("/:id", authenticateToken, updateReview);
reviewRouter.delete("/:id", authenticateToken, deleteReview);

module.exports = reviewRouter;
