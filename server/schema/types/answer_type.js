const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const UserType = require("./user_type");
const BookType = require("./book_type");
const Answer = mongoose.model("answers");

const AnswerType = new GraphQLObjectType({
  name: "AnswerType",
  fields: () => ({
    _id: { type: GraphQLID },
    answer: { type: GraphQLString },
    user: { type: UserType },
    book: { type: BookType },
    likes: {
      type: new GraphQLList(require("./like_type")),
      async resolve(parentValue) {
        const answer = Answer.findById(parentValue.id).populate("likes");
        return answer.likes;
      }
    },
    comments: {
      type: new GraphQLList(require("./comment_type")),
      async resolve(parentValue) {
        const answer = await Answer.findById(parentValue.id).populate(
          "comment"
        );
        return answer.comments;
      }
    }
  })
});

module.exports = AnswerType;
