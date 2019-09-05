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
const BookType = require("./book_type");

const User = mongoose.model("users");
const Book = mongoose.model("books");

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
        if (queryString) {
          const regexp = new RegExp(queryString, "i");
          return await User.find({
            $or: [{ name: regexp }, { email: regexp }]
          })
            .populate("shelves")
            .limit(30);
        }

        return await User.find({})
          .populate("shelves")
          .limit(30);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parentValue) {
        return Book.find({})
      }
    },
    booksByGenre: {
      type: new GraphQLList(BookType),
      args: { genreString: { type: GraphQLString } },
      resolve(parentValue, { genreString } ) {
        return Book.find({ genres: genreString }).limit(6)
      }
    },
    booksByGenreShow: {
      type: new GraphQLList(BookType),
      args: { genreString: { type: GraphQLString } },
      resolve(parentValue, { genreString }) {
      return Book.find({ genres: genreString }).limit(24)
      }
    }
  })
});

module.exports = RootQueryType;
