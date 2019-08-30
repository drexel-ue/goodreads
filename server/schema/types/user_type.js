const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const User = mongoose.model("users")

const UserType = new GraphQLObjectType({
  name: "UserType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    questions: {
      type: new GraphQLList(require("./question_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id).populate("questions")
      }
    },
    reviews: {
      type: new GraphQLList(require("./review_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id).populate("reviews")
      }
    }
  })
});

module.exports = UserType;
