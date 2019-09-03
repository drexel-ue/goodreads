const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "books"
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "comments"
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "questions"
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: "answers"
  }
});

module.exports = mongoose.model("likes", LikeSchema);
