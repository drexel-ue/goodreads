const graphqldate = require("graphql-iso-date");
const { GraphQLDateTime } = graphqldate;
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const BookType = require("./book_type");
const UserType = require("./user_type");
const Question = mongoose.model("questions");

const QuestionType = new GraphQLObjectType({
  name: "QuestionType",
  fields: () => ({
    _id: { type: GraphQLID },
    question: { type: GraphQLString },
    book: { type: BookType },
    user: { type: UserType },
    likes: {
      type: new GraphQLList(require("./like_type")),
      async resolve(parentValue) {
        const question = await Question.findById(parentValue.id).populate(
          "likes"
        );
        return question.likes;
      }
    },
    date: { type: GraphQLDateTime }
  })
});
module.exports = QuestionType;
