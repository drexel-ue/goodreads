const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  //   authors: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "authors"
  //     }
  //   ],
  rating: {
    type: Number
  },
  coverPhoto: {
    type: String,
    required: true
  },
  coverType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    required: true
  },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: "publishers"
  },
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: "genres"
    }
  ],
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: "ratings"
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews"
    }
  ],
  series: {
    type: Schema.Types.ObjectId,
    ref: "series"
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref
    }
  ],
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "characters"
    }
  ],
  edition: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  setting: [
    {
      type: Schema.Types.ObjectId,
      ref: "settings"
    }
  ]
});

module.exports = mongoose.model("books", BookSchema);
