const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShelfSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "books"
    }
  ]
});

module.exports = mongoose.model("shelves", ShelfSchema);
