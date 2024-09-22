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
      type: Schema.Types.ObjectId,
      ref: "Actors",
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reviews",
    },
  ],
  awards: {
    win: [
      {
        type: String,
      },
    ],
    nomination: [
      {
        type: String,
      },
    ],
  },
  directors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Directors",
    },
  ],
});

module.exports = mongoose.model("Movies", movieSchema);
