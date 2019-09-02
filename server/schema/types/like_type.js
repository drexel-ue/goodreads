const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require("./user_type")
const BookType = require("./book_type")
const CommentType = require("./comment_type")
const QuestionType = require("./question_type")
const AnswerType = require("./answer_type")


const LikeType = new GraphQLObjectType({
    name: "LikeType",
    fields: () => ({
        _id: { type: GraphQLID },
        user: { type: UserType },
        book: { type: BookType },
        comment: { type: CommentType },
        question: { type: QuestionType },
        answers: { type: AnswerType }
    })
})

module.exports = LikeType