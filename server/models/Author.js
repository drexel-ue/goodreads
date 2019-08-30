const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String
  },
  website: {
    type: String
  },
  twitter: {
    type: String
  },
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: "genres"
    }
  ],
  bio: {
    type: String,
    required: true
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "books"
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "videos"
    }
  ]
});

module.exports = mongoose.model("authors", AuthorSchema);
