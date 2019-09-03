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

SeriesSchema.statics.addBook = (seriesId, bookId) => {
  const Series = mongoose.model("series");
  const Book = mongoose.model("books");

  return Series.findById(seriesId).then(series => {
    return Book.findById(bookId).then(book => {
      series.books.push(book);
      book.series = seriesId;

      return Promise.all([series.save(), book.save()]).then(
        ([series, book]) => series
      );
    });
  });
};

SeriesSchema.statics.removeBook = (seriesId, bookId) => {
  const Series = mongoose.model("series");
  const Book = mongoose.model("books");

  return Series.findById(seriesId).then(series => {
    return Book.findById(bookId).then(book => {
      series.books.pull(book);
      book.series = {}

      return Promise.all([series.save(), book.save()]).then(
        ([series, book]) => series
      );
    });
  });
};

module.exports = mongoose.model("series", SeriesSchema);
