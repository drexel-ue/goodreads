const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "books"
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "likes"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("answers", AnswerSchema);
