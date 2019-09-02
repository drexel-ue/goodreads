const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  name: {
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

module.exports = mongoose.model("publishers", PublisherSchema);
