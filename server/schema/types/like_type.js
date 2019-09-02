const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require("./user_type")
const BookType = require("./book_type")

const LikeType = new GraphQLObjectType({
    name: "LikeType",
    fields: () => ({
        _id: { type: GraphQLID },
        user: { type: UserType },
        book: { type: BookType }
    })
})

module.exports = LikeType