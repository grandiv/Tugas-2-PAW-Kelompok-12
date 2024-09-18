const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  genre: [
    {
      type: String,
      required: true,
    },
  ],
  release_date: {
    type: Date,
  },
  actors: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
  },
  rating: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
      score: {
        type: Schema.Types.Decimal128,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Movies", movieSchema);
