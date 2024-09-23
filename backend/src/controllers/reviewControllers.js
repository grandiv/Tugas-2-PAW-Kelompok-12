const Review = require("../models/reviewModels");
const Movie = require("../models/movieModels");

const createReview = async (req, res) => {
  try {
    const { movieId, score, comment } = req.body;
    const userId = req.user.id;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const existingReview = await Review.findOne({
      user: userId,
      movie: movieId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this movie." });
    }

    const newReview = new Review({
      user: userId,
      movie: movieId,
      score,
      comment,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, comment } = req.body;
    const userId = req.user.id;

    const review = await Review.findOne({ _id: id, user: userId });
    if (!review) {
      return res.status(404).json({
        message:
          "Review not found or you are not authorized to update this review",
      });
    }

    review.score = score ?? review.score;
    review.comment = comment ?? review.comment;

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getMovieReviews = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reviews = await Review.find({ movie: movieId })
      .populate("user", "username")
      .sort({ date_posted: -1 });

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this movie" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "username");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findOneAndDelete({ _id: id, user: userId });

    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found or not authorized" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  updateReview,
  getMovieReviews,
  deleteReview,
};
