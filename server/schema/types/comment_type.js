const graphqldate = require("graphql-iso-date");
const { GraphQLDateTime } = graphqldate;
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const UserType = require("./user_type");
const Comment = mongoose.model("comments");

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    _id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: { type: UserType },
    likes: {
      type: new GraphQLList(require("./like_type")),
      async resolve(parentValue) {
        const comment = await Comment.findById(parentValue.id).populate(
          "likes"
        );
        return comment.likes;
      }
    },
    date: { type: GraphQLDateTime }
  })
});

module.exports = CommentType;
