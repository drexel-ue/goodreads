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
    type: Schema.Types.ObjectId,
    ref: "ratings"
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
    type: Schema.Types.ObjectId,
    ref: "publishers"
  },
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: "genres"
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
    type: Schema.Types.ObjectId,
    ref: "series"
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
      type: Schema.Types.ObjectId,
      ref: "settings"
    }
  ]
});

BookSchema.statics.addSetting = (bookId, settingId) => {
  const Book = mongoose.model("books");
  const Setting = mongoose.model("settings");

  return Book.findById(bookId).then(book => {
    return Setting.findById(settingId).then(setting => {
      book.settings.push(setting);
      setting.books.push(book);

      return Promise.all([book.save(), setting.save()]).then(
        ([book, setting]) => book
      );
    });
  });
};

BookSchema.statics.removeSetting = (bookId, settingId) => {
  const Book = mongoose.model("books");
  const Setting = mongoose.model("settings");

  return Book.findById(bookId).then(book => {
    return Setting.findById(settingId).then(setting => {
      book.settings.pull(setting);
      setting.books.pull(book);

      return Promise.all([book.save(), setting.save()]).then(
        ([book, setting]) => book
      );
    });
  });
};

BookSchema.statics.findSettings = function(bookId) {
  return this.findById(bookId)
    .populate("settings")
    .then(book => book.settings);
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
BookSchema.statics.addGenre = (bookId, authorId) => {
  const Book = mongoose.model("books");
  const Genre = mongoose.model("genres");

  return Book.findById(bookId).then(book => {
    return Genre.findById(authorId).then(genre => {
      book.genres.push(genre);
      genre.books.push(book);

      return Promise.all([book.save(), genre.save()]).then(
        ([book, genre]) => book
      );
    });
  });
};

BookSchema.statics.removeGenre = (bookId, authorId) => {
  const Book = mongoose.model("books");
  const Genre = mongoose.model("genres");

  return Book.findById(bookId).then(book => {
    return Genre.findById(authorId).then(genre => {
      book.genres.pull(genre);
      genre.books.pull(book);

      return Promise.all([book.save(), genre.save()]).then(
        ([book, genre]) => book
      );
    });
  });
};

BookSchema.statics.findGenres = function(bookId) {
  return this.findById(bookId)
    .populate("genres")
    .then(book => book.genres);
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
