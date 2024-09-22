const Review = require("../models/reviewModels");

async function getOneReview(req, res, next) {
  let review;
  try {
    review = await Review.findById(req.params.id);
    if (review == null) {
      return res.status(404).json({ message: "Cannot find review" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.review = review;
  next();
}

module.exports = { getOneReview };
