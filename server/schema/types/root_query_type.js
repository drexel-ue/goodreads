const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");

const User = mongoose.model("users");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(_, args) {
        return await User.findById(args._id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        return await User.find({});
      }
    }
  })
});

module.exports = RootQueryType;
