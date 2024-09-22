const mongoose = require("mongoose");
const { Schema } = mongoose;

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
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
    },
  ],
});

module.exports = mongoose.model("Directors", directorSchema);
