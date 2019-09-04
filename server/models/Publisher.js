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

PublisherSchema.statics.addBook = (publisherId, bookId) => {
  const Publisher = mongoose.model("publishers");
  const Book = mongoose.model("books");

  return Publisher.findById(publisherId).then(publisher => {
    return Book.findById(bookId).then(book => {
      publisher.books.push(book);
      book.publisher = publisherId;

      return Promise.all([publisher.save(), book.save()]).then(
        ([publisher, book]) => publisher
      );
    });
  });
};

PublisherSchema.statics.removeBook = (publisherId, bookId) => {
  const Publisher = mongoose.model("publishers");
  const Book = mongoose.model("books");

  return Publisher.findById(publisherId).then(publisher => {
    return Book.findById(bookId).then(book => {
      publisher.books.pull(book);

      return Promise.all([publisher.save(), book.save()]).then(
        ([publisher, book]) => publisher
      );
    });
  });
};
module.exports = mongoose.model("publishers", PublisherSchema);
