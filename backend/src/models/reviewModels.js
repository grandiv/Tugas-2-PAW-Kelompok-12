const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  comment: {
    type: String
  },
  date_posted: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reviews', reviewSchema);
