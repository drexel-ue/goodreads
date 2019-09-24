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
const ShelfType = require("./shelf_type");
const ReviewType = require("./review_type");

const User = mongoose.model("users");
const Book = mongoose.model("books");
const Review = mongoose.model("reviews");
const Author = mongoose.model("authors");
const Shelf = mongoose.model("shelves");

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
    book: {
      type: BookType,
      args: { _id: { type: GraphQLID } },
      async resolve(_, { _id }) {
        return await Book.findById(_id).populate("authors");
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(_) {
        return Book.find({});
      }
    },
    booksByGenre: {
      type: new GraphQLList(BookType),
      args: { genreString: { type: GraphQLString } },
      resolve(_, { genreString }) {
        return Book.find({ genres: genreString }).limit(6);
      }
    },
    booksBySeries: {
      type: new GraphQLList(BookType),
      args: { series: { type: GraphQLString } },
      async resolve(_, { series }) {
        return await Book.find({ series }).populate("authors");
      }
    },
    booksByAuthor: {
      type: new GraphQLList(BookType),
      args: { _id: { type: GraphQLID } },
      async resolve(_, { _id }) {
        const author = await Author.findById(_id).populate("books");
        return author.books;
      }
    },
    booksByGenreShow: {
      type: new GraphQLList(BookType),
      args: { genreString: { type: GraphQLString } },
      resolve(_, { genreString }) {
        return Book.find({ genres: genreString }).limit(24);
      }
    },
    shelvesByUser: {
      type: new GraphQLList(ShelfType),
      args: { _id: { type: GraphQLID } },
      async resolve(_, { _id }) {
        return await Shelf.find({ user: _id });
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(_) {
        return Review.find({});
      }
    },
    bookSearch: {
      type: new GraphQLList(BookType),
      args: { queryString: { type: GraphQLString } },
      async resolve(_, { queryString }) {
        const pattern = new RegExp("^" + queryString, "i");
        let books = await Book.find({
          $or: [
            {
              title: pattern
            },
            { series: pattern },
            { isbn: pattern }
          ]
        });
        // let authors = await Author.find({ name: pattern }).populate("books");
        // authors.forEach(author => {
        //   books.concat(author.books);
        // });

        return books;
      }
    }
  })
});

module.exports = RootQueryType;
