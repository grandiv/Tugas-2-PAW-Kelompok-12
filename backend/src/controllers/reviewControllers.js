const Review = require("../models/reviewModels");
const Movie = require("../models/movieModels");
const User = require("../models/userModels");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "username");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReview = async (req, res) => {
  res.json(res.review);
};

const updateReview = async (req, res) => {
  if (req.body.score != null) {
    res.review.score = req.body.score;
  }
  if (req.body.comment != null) {
    res.review.comment = req.body.comment;
  }

  try {
    const updatedReview = await res.review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted review" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addMovieReview = async (req, res) => {
  try {
    const { movieId, score, comment } = req.body;
    const userId = req.user.id;

    const newReview = new Review({
      user: userId,
      movie: movieId,
      score: score,
      comment: comment,
    });

    const savedReview = await newReview.save();

    await Movie.findByIdAndUpdate(
      movieId,
      { $push: { reviews: savedReview._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $push: { reviews: savedReview._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Review added successfully",
      review: savedReview,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  addMovieReview,
};
