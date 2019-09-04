const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const User = mongoose.model("users")

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    isLoggedIn: { type: GraphQLBoolean },
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
      resolve(parentValue) {
        return User.findById(parentValue.id).populate("questions")
      }
    },
    reviews: {
      type: new GraphQLList(require("./review_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id).populate("reviews")
      }
    },
    shelves: {
      type: new GraphQLList(require("./shelf_type")),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("shelves")
          .then(user => user.shelves)
      }
    }
  })
});

module.exports = UserType;