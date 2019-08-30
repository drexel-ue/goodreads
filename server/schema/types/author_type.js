const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const Author = mongoose.model("authors")

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        profilePhoto: { type: GraphQLString },
        website: { type: GraphQLString },
        twitter: { type: GraphQLString },
        genres: {
            type: new GraphQLList(require("./genre_type")),
            resolve(parentValue) {
                return Author.findById(parentValue.id).populate("genres")
            }
        },
        bio: { type: GraphQLString },
        books: {
            type: new GraphQLList(require("./book_type")),
            resolve(parentValue) {
                return Author.findById(parentValue.id).populate("books")
            }
        },
        followers: {
            type: new GraphQLList(require("./user_type")),
            resolve(parentValue) {
                return Author.findById(parentValue.id).populate("users")
            }
        },
        videos: {
            type: new GraphQLList(require("./video_type")),
            resolve(parentValue) {
                return Author.findById(parentValue.id).populate("videos")
            }
        }
    })
})

module.export = AuthorType