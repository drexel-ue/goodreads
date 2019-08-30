const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const Character = mongoose.model("characters")

const CharacterType = new GraphQLObjectType({
    name: "CharacterType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type, GraphQLString },
        books: {
            type: new GraphQLList(require("./book_type")),
            resolve(parentValue) {
                return Character.findById(parentValue.id).populate("books")
            }
        }
    })
})

module.exports = CharacterType