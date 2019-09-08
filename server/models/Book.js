const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: "authors"
    }
  ],
  rating: {
    type: Number
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
    type: String
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
    required: true
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

BookSchema.statics.removeGenre = async (bookId, genreId) => {
  const Book = mongoose.model("books");

  const book = await Book.findById(bookId);
  book.genres = book.genres.filter(gen => gen !== genre);

  return await Book.save();
};

BookSchema.statics.addReview = async (bookId, reviewId) => {
  const Book = mongoose.model("books");
  const Review = mongoose.model("reviews")

  return await Book.findById(bookId).then(book => {
    return Review.findById(reviewId).then(review => {
      book.reviews.push(review)
      return book.save();
    })
  })

};

BookSchema.statics.removeReview = async (bookId, review) => {
  const Book = mongoose.model("books");

  const book = await Book.findById(bookId);
  book.reviews = book.reviews.filter(gen => gen !== review);

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

BookSchema.statics.addRating = (bookId, ratingId) => {
  const Book = mongoose.model("books");
  const Rating = mongoose.model("ratings");

  return Book.findById(bookId).then(book => {
    return Rating.findById(ratingId).then(rating => {
      book.ratings.push(rating);
      rating.books.push(book);

      return Promise.all([book.save(), rating.save()]).then(
        ([book, rating]) => book
      );
    });
  });
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

BookSchema.statics.addQuestion = (bookId, ratingId) => {
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

BookSchema.statics.removeQuestion = (bookId, questionId) => {
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

module.exports = mongoose.model("books", BookSchema);
