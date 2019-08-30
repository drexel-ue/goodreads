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
  }
});

module.exports = mongoose.model("likes", LikeSchema);
