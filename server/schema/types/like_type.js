const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const UserType = require("./user_type")

const LikeType = new GraphQLObjectType({
    name: "LikeType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        user: { type: UserType }
    })
})

module.exports = LikeType