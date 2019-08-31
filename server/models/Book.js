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
BookSchema.statics.addGenre = (bookId, genreId) => {
  const Book = mongoose.model("books");
  const Genre = mongoose.model("genres");

  return Book.findById(bookId).then(book => {
    return Genre.findById(genreId).then(genre => {
      book.genres.push(genre);
      genre.books.push(book);

      return Promise.all([book.save(), genre.save()]).then(
        ([book, genre]) => book
      );
    });
  });
};

BookSchema.statics.removeGenre = (bookId, genreId) => {
  const Book = mongoose.model("books");
  const Genre = mongoose.model("genres");

  return Book.findById(bookId).then(book => {
    return Genre.findById(genreId).then(genre => {
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

module.exports = mongoose.model("books", BookSchema);
