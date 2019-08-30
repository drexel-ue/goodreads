const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const BookType = require("./book_type")

const GenreType = new GraphQLObjectType({
    name: "GenreType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        book: { type: BookType }
    })
})

module.exports = GenreType