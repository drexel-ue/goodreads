const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "books"
  }
});

module.exports = mongoose.model("genres", GenreSchema);
