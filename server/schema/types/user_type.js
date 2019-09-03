const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt
} = graphql;
const User = mongoose.model("users");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profilePhoto: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    currentlyReading: { type: require("./book_type") },
    currentPage: { type: GraphQLInt },
    friends: {
      type: new GraphQLList(UserType),
      async resolve(parentValue) {
        const user = await User.findById(parentValue.id).populate("friends");
        return user.friends;
      }
    },
    questions: {
      type: new GraphQLList(require("./question_type")),
      async resolve(parentValue) {
        const user = await User.findById(parentValue.id).populate("questions");
        return user.questions;
      }
    },
    reviews: {
      type: new GraphQLList(require("./review_type")),
      async resolve(parentValue) {
        const user = await User.findById(parentValue.id).populate("reviews");
        return user.reviews;
      }
    },
    shelves: {
      type: new GraphQLList(require("./shelf_type")),
      async resolve(parentValue) {
        const user = await User.findById(parentValue.id).populate("shelves");
        return user.shelves;
      }
    }
  })
});

module.exports = UserType;
