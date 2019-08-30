const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
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

module.exports = mongoose.model("comments", CommentSchema);
