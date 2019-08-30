const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const UserType = require("./user_type")
const BookType = require("./book_type")
const Rating = mongoose.model("ratings")

const RatingType = new GraphQLObjectType({
    name: "RatingType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        stars: { type: GraphQLInt },
        user: { type: UserType },
        book: { type: BookType }
    })
})

module.exports = RatingType