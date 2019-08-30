const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const UserType = require("./user_type")
const BookType = require("./book_type")
const Answer = mongoose.model("answers")

const AnswerType = new GraphQLObjectType({
    name: "AnswerType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: {type: GraphQLID},
        answer: {type: GraphQLString},
        user: {type: UserType },
        book: {type: BookType },
        likes: {
            type: new GraphQLList(require("./like_type")),
            resolve(parentValue) {
                return Answer.findById(parentValue.id).populate("likes")
            }
        },
        comments: {
            type: new GraphQLList(require("./comment_type")),
            resolve(parentValue) {
                return Answer.findById(parentValue.id).populate("comment")
            }
        }
    })
})

module.exports = AnswerType