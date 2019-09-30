const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: "authors"
    }
  ],
  rating: {
    type: Number,
    default: 0
  },
  coverPhoto: {
    type: String,
    required: true
  },
  coverType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    required: true
  },
  publisher: {
    type: String
  },
  genres: [
    {
      type: String
    }
  ],
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: "ratings"
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews"
    }
  ],
  series: {
    type: String,
    index: true
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "questions"
    }
  ],
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "characters"
    }
  ],
  edition: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    index: true
  },
  settings: [
    {
      type: String
    }
  ]
});

BookSchema.statics.addSetting = async (bookId, setting) => {
  const Book = mongoose.model("books");

  const book = await Book.findById(bookId);
  book.settings.push(setting);

  return await book.save();
};

BookSchema.statics.removeSetting = async (bookId, setting) => {
  const Book = mongoose.model("books");

  const book = await Book.findById(bookId);
  book.settings = book.settings.filter(set => set !== setting);

  return await book.save();
};

BookSchema.statics.findSettings = async bookId => {
  const Book = mongoose.model("books");

  const book = await Book.findById(bookId);

  return book.settings;
};

BookSchema.statics.addCharacter = (bookId, characterId) => {
  const Book = mongoose.model("books");
  const Character = mongoose.model("characters");

  return Book.findById(bookId).then(book => {
    return Character.findById(characterId).then(character => {
      book.characters.push(character);
      character.books.push(book);

      return Promise.all([book.save(), character.save()]).then(
        ([book, character]) => book
      );
    });
  });
};

BookSchema.statics.removeCharacter = (bookId, characterId) => {
  const Book = mongoose.model("books");
  const Character = mongoose.model("characters");

  return Book.findById(bookId).then(book => {
    return Character.findById(characterId).then(character => {
      book.characters.pull(character);
      character.books.pull(book);

      return Promise.all([book.save(), character.save()]).then(
        ([book, character]) => book
      );
    });
  });
};

BookSchema.statics.findCharacters = function(bookId) {
  return this.findById(bookId)
    .populate("characters")
    .then(book => book.characters);
};
BookSchema.statics.addGenre = async (bookId, genre) => {
  const Book = mongoose.model("books");

  const book = await Book.findById(bookId);
  book.genres.push(genre);

  return await book.save();
};

BookSchema.statics.removeGenre = async (bookId, genre) => {
  const Book = mongoose.model("books");

  const book = await Book.findById(bookId);
  book.genres = book.genres.filter(gen => gen !== genre);

  return await Book.save();
};

BookSchema.statics.findGenres = async bookId => {
  const Book = mongoose.model("books");

  const book = await Book.findById(bookId);

  return await book.genres;
};

BookSchema.statics.addAuthor = (bookId, authorId) => {
  const Book = mongoose.model("books");
  const Author = mongoose.model("authors");

  return Book.findById(bookId).then(book => {
    return Author.findById(authorId).then(author => {
      book.authors.push(author);
      author.books.push(book);

      return Promise.all([book.save(), author.save()]).then(
        ([book, author]) => book
      );
    });
  });
};

BookSchema.statics.removeAuthor = (bookId, authorId) => {
  const Book = mongoose.model("books");
  const Author = mongoose.model("authors");

  return Book.findById(bookId).then(book => {
    return Author.findById(authorId).then(author => {
      book.authors.pull(author);
      author.books.pull(book);

      return Promise.all([book.save(), author.save()]).then(
        ([book, author]) => book
      );
    });
  });
};

BookSchema.statics.leaveRating = async (bookId, user, stars) => {
  const Book = mongoose.model("books");
  const Rating = mongoose.model("ratings");

  const book = await Book.findById(bookId);
  const rating = new Rating({ bookId, user, stars });
  book.ratings.push(rating._id);
  book.rating = (book.rating + stars) / book.ratings.length;
  await rating.save();
  const bookDoc = await book.save();
  return bookDoc;
};

BookSchema.statics.removeRating = (bookId, ratingId) => {
  const Book = mongoose.model("books");
  const Rating = mongoose.model("ratings");

  return Book.findById(bookId).then(book => {
    return Rating.findById(ratingId).then(rating => {
      book.ratings.pull(rating);
      rating.books.pull(book);

      return Promise.all([book.save(), rating.save()]).then(
        ([book, rating]) => book
      );
    });
  });
};

BookSchema.statics.addQuestion = (bookId, questionId) => {
  const Book = mongoose.model("books");
  const Question = mongoose.model("questions");

  return Book.findById(bookId).then(book => {
    return Question.findById(questionId).then(question => {
      book.questions.push(question);
      question.books.push(book);

      return Promise.all([book.save(), question.save()]).then(
        ([book, question]) => book
      );
    });
  });
};

BookSchema.statics.removeReview = (bookId, reviewId) => {
  const Book = mongoose.model("books");
  const Question = mongoose.model("questions");

  return Book.findById(bookId).then(book => {
    return Question.findById(questionId).then(question => {
      book.questions.pull(question);
      question.books.pull(book);

      return Promise.all([book.save(), question.save()]).then(
        ([book, question]) => book
      );
    });
  });
};
BookSchema.statics.addQuestion = (bookId, questionId) => {
  const Book = mongoose.model("books");
  const Question = mongoose.model("questions");

  return Book.findById(bookId).then(book => {
    return Question.findById(questionId).then(question => {
      book.questions.push(question);
      question.books.push(book);

      return Promise.all([book.save(), question.save()]).then(
        ([book, question]) => book
      );
    });
  });
};

BookSchema.statics.removeQuestion = (bookId, reviewId) => {
  const Book = mongoose.model("books");
  const Review = mongoose.model("reviews");

  return Book.findById(bookId).then(book => {
    return Review.findById(reviewId).then(review => {
      book.reviews.pull(review);

      return Promise.all([book.save(), review.save()]).then(
        ([book, review]) => book
      );
    });
  });
};

module.exports = mongoose.model("books", BookSchema);
