const graphqldate = require("graphql-iso-date")
const { GraphQLDateTime } = graphqldate
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const UserType = require("./user_type")
const Comment = mongoose.model("comments")

const CommentType = new GraphQLObjectType({
    name: "CommentType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: { type: UserType },
        likes: {
            type: new GraphQLList(require("./like_type")),
            resolve(parentValue) {
                return Character.findById(parentValue.id).populate("likes")
            }
        },
        date: { type: GraphQLDateTime },
    })
})

module.exports = CommentType