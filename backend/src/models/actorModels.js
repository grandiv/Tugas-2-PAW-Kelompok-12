var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Actors = new Schema({
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
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});
