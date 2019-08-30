const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const BookType = require("./book_type")
const Genre = mongoose.model("genres")

const GenreType = new GraphQLObjectType({
    name: "GenreType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        book: { type: BookType }
    })
})

module.exports = GenreType