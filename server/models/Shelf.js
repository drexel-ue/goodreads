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

ShelfSchema.statics.addBook = (shelfId, bookId) => {
  const Shelf = mongoose.model("shelves");
  const Book = mongoose.model("books");

  return Shelf.findById(shelfId).then(shelf => {
    return Book.findById(bookId).then(book => {
      shelf.books.push(book);

      return Promise.all([shelf.save(), book.save()]).then(
        ([shelf, _]) => shelf
      );
    });
  });
};

ShelfSchema.statics.removeBook = (shelfId, bookId) => {
  const Shelf = mongoose.model("shelves");
  const Book = mongoose.model("books");

  return Shelf.findById(shelfId).then(shelf => {
    return Book.findById(bookId).then(book => {
      shelf.books.pull(book);

      return Promise.all([shelf.save(), book.save()]).then(
        ([shelf, book]) => shelf
      );
    });
  });
};

module.exports = mongoose.model("shelves", ShelfSchema);
