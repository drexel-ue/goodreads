const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} = graphql;

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
      args: { queryString: { type: GraphQLString } },
      async resolve(_, { queryString }) {
        const regexp = new RegExp(queryString, "i");

        if (queryString) {
          return await User.find({
            $or: [{ name: regexp }, { email: regexp }]
          });
        }

        return await User.find({});
      }
    }
  })
});

module.exports = RootQueryType;
