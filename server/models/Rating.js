const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  stars: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  book: {
      type: Schema.Types.ObjectId,
      ref: "books"
  }
});

module.exports = mongoose.model("ratings", RatingSchema);
