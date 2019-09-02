const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  setting: {
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

module.exports = mongoose.model("settings", SettingSchema);
