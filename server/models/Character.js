const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
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

CharacterSchema.statics.addBook = (characterId, bookId) => {
    const Character = mongoose.model("characters");
    const Book = mongoose.model("books");

    return Character.findById(characterId).then(character => {
        return Book.findById(bookId).then(book => {
            character.books.push(book);
            book.characters.push(character);

            return Promise.all([character.save(), book.save()]).then(
                ([character, book]) => character
            );
        });
    });
};

CharacterSchema.statics.removeBook = (characterId, bookId) => {
    const Character = mongoose.model("characters");
    const Book = mongoose.model("books");

    return Character.findById(characterId).then(character => {
        return Book.findById(bookId).then(book => {
            character.books.pull(book);
            book.characters.pull(character);

            return Promise.all([character.save(), book.save()]).then(
                ([character, book]) => character
            );
        });
    });
};

module.exports = mongoose.model("characters", CharacterSchema);