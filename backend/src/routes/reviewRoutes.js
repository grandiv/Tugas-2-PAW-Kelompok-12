const express = require("express");
const reviewRouter = express.Router();
const { authenticateToken } = require("../middlewares/authMiddleware");

const {
  createReview,
  updateReview,
  getMovieReviews,
  deleteReview,
} = require("../controllers/reviewControllers");

reviewRouter.post("/create", authenticateToken, createReview);
reviewRouter.get("/movie/:movieId", getMovieReviews);
reviewRouter.patch("/:id", authenticateToken, updateReview);
reviewRouter.delete("/:id", authenticateToken, deleteReview);

module.exports = reviewRouter;
