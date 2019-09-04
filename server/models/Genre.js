const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
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

GenreSchema.statics.addBook = (genreId, bookId) => {
  const Genre = mongoose.model("genres");
  const Book = mongoose.model("books");

  return Genre.findById(genreId).then(genre => {
    return Book.findById(bookId).then(book => {
      genre.books.push(book);
      book.genres.push(genre);

      return Promise.all([genre.save(), book.save()]).then(
        ([genre, book]) => genre
      );
    });
  });
};

GenreSchema.statics.removeBook = (genreId, bookId) => {
  const Genre = mongoose.model("genres");
  const Book = mongoose.model("books");

  return Genre.findById(genreId).then(genre => {
    return Book.findById(bookId).then(book => {
      genre.books.pull(book);
      book.genres.pull(genre);

      return Promise.all([genre.save(), book.save()]).then(
        ([genre, book]) => genre
      );
    });
  });
};
module.exports = mongoose.model("genres", GenreSchema);
