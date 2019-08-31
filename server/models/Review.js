const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "books"
  },
  content: {
    type: String
  },
  hidden: {
    type: Boolean,
    default: false
  },
  dateStarted: {
    type: Date
  },
  dateFinished: {
    type: Date
  },
  recommendTo: {
    type: String
  },
  recommendedBy: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  privateNotes: {
    type: String
  },
  owned: {
    type: Boolean,
    default: false
  },
  postToBlog: {
    type: Boolean,
    default: false
  },
  addToFeed: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("reviews", ReviewSchema);
