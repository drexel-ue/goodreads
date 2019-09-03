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

SettingSchema.statics.addBook = (settingId, bookId) => {
  const Setting = mongoose.model("settings");
  const Book = mongoose.model("books");

  return Setting.findById(settingId).then(setting => {
    return Book.findById(bookId).then(book => {
      setting.books.push(book);
      book.settings.push(setting);

      return Promise.all([setting.save(), book.save()]).then(
        ([setting, book]) => setting
      );
    });
  });
};

SettingSchema.statics.removeBook = (settingId, bookId) => {
  const Setting = mongoose.model("settings");
  const Book = mongoose.model("books");

  return Setting.findById(settingId).then(setting => {
    return Book.findById(bookId).then(book => {
      setting.books.pull(book);
      book.settings.pull(setting);

      return Promise.all([setting.save(), book.save()]).then(
        ([setting, book]) => setting
      );
    });
  });
};

module.exports = mongoose.model("settings", SettingSchema);
