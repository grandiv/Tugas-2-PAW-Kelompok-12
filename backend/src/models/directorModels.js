const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  birth: {
    date: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

module.exports = mongoose.model("Directors", directorSchema);
