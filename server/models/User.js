const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "questions"
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews"
    }
  ],
  followedAuthors: [
    {
      type: Schema.Types.ObjectId,
      ref: "authors"
    }
  ],
  shelves: [
    {
      type: Schema.Types.ObjectId,
      ref: "shelves"
    }
  ]
});

module.exports = mongoose.model("users", UserSchema);
