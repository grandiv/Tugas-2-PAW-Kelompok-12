const mongoose = require("mongoose");

const tesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
    default: 1 / 1 / 2000,
  },
});

module.exports = mongoose.model("Tes", tesSchema);
