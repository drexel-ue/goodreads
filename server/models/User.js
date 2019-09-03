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
  profilePhoto: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkQeaUoawZR3nca9VClt8XQO38BxMqdRVOsfgzjYaLgzbJxjh"
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
  currentPage: {
    type: Number,
    default: 420
  },
  currentlyReading: {
    type: Schema.Types.ObjectId,
    ref: "book",
    default: "5d6e955423a103754cd3e60e"
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
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
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
