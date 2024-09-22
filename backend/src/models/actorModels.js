const mongoose = require("mongoose");
const { Schema } = mongoose;

const actorSchema = new mongoose.Schema({
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
    },
  ],
});

module.exports = mongoose.model("Actors", actorSchema);
