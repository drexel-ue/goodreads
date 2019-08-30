const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
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

module.exports = mongoose.model("characters", CharacterSchema);