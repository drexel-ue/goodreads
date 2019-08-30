const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "books"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "likes"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("questions", QuestionSchema);
