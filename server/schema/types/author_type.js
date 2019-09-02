const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Author = mongoose.model("authors");

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    profilePhoto: { type: GraphQLString },
    website: { type: GraphQLString },
    twitter: { type: GraphQLString },
    genres: {
      type: new GraphQLList(require("./genre_type")),
      async resolve(parentValue) {
        const author = await Author.findById(parentValue.id).populate("genres");
        return author.genres;
      }
    },
    bio: { type: GraphQLString },
    books: {
      type: new GraphQLList(require("./book_type")),
      async resolve(parentValue) {
        const author = await Author.findById(parentValue.id).populate("books");
        return author.books;
      }
    },
    followers: {
      type: new GraphQLList(require("./user_type")),
      async resolve(parentValue) {
        const author = await Author.findById(parentValue.id).populate(
          "followers"
        );
        return author.followers;
      }
    }
    // videos: {
    //     type: new GraphQLList(require("./video_type")),
    //     resolve(parentValue) {
    //         return Author.findById(parentValue.id).populate("videos")
    //     }
    // }
  })
});

module.exports = AuthorType;
