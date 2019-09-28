const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true 
  },
  profilePhoto: {
    type: String
  },
  website: {
    type: String
  },
  twitter: {
    type: String
  },
  genres: [
    {
      type: String
    }
  ],
  bio: {
    type: String,
    required: true
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "books"
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "videos"
    }
  ]
});

AuthorSchema.statics.addGenre = (authorId, genreId) => {
  const Author = mongoose.model("authors");
  const Genre = mongoose.model("genres");

  return Author.findById(authorId).then(author => {
    return Genre.findById(genreId).then(genre => {
      author.genres.push(genre);

      return Promise.all([author.save(), genre.save()]).then(
        ([author, genre]) => author
      );
    });
  });
};

AuthorSchema.statics.removeGenre = (authorId, genreId) => {
  const Author = mongoose.model("authors");
  const Genre = mongoose.model("genres");

  return Author.findById(authorId).then(author => {
    return Genre.findById(genreId).then(genre => {
      author.genres.pull(genre);

      return Promise.all([author.save(), genre.save()]).then(
        ([author, genre]) => author
      );
    });
  });
};

AuthorSchema.statics.addBook = (authorId, bookId) => {
  const Author = mongoose.model("authors");
  const Book = mongoose.model("books");

  return Author.findById(authorId).then(author => {
    return Book.findById(bookId).then(book => {
      author.books.push(book);
      book.authors.push(author);

      return Promise.all([author.save(), book.save()]).then(
        ([author, book]) => author
      );
    });
  });
};

AuthorSchema.statics.removeBook = (authorId, bookId) => {
  const Author = mongoose.model("authors");
  const Book = mongoose.model("books");

  return Author.findById(authorId).then(author => {
    return Book.findById(bookId).then(book => {
      author.books.pull(book);
      book.authors.pull(book);

      return Promise.all([author.save(), book.save()]).then(
        ([author, book]) => author
      );
    });
  });
};

AuthorSchema.statics.addFollower = (authorId, userId) => {
  const Author = mongoose.model("authors");
  const User = mongoose.model("users");

  return Author.findById(authorId).then(author => {
    return User.findById(userId).then(user => {
      author.followers.push(user);
      user.followedAuthors.push(author);

      return Promise.all([author.save(), user.save()]).then(
        ([author, user]) => author
      );
    });
  });
};

AuthorSchema.statics.removeFollower = (authorId, userId) => {
  const Author = mongoose.model("authors");
  const User = mongoose.model("users");

  return Author.findById(authorId).then(author => {
    return User.findById(userId).then(user => {
      author.followers.pull(user);
      user.followedAuthors.pull(user);

      return Promise.all([author.save(), user.save()]).then(
        ([author, user]) => author
      );
    });
  });
};

module.exports = mongoose.model("authors", AuthorSchema);
