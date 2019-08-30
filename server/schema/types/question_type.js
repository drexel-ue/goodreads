const graphqldate = require("graphql-iso-date")
const { GraphQLDateTime } = graphqldate
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const BookType = require("./book_type")
const UserType = require("./user_type")
const Question = mongoose.model("questions")

const QuestionType = new GraphQLObjectType({
    name: "QuestionType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        question: { type: GraphQLString },
        book: { type: BookType },
        user: { type: UserType },
        likes: {
            type: new GraphQLList(require("./like_type")),
            resolve(parentValue) {
                return Question.findById(parentValue.id).populate("likes")
            }
        },
        date: { type: GraphQLDateTime }
    })
})
module.exports = QuestionType
