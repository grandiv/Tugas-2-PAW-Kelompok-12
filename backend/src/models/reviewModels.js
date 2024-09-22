const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movies",
    required: true,
  },
  score: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  comment: {
    type: String,
  },
  date_posted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reviews", reviewSchema);
