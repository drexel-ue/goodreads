const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "books"
    }
  ]
});

module.exports = mongoose.model("series", SeriesSchema);
