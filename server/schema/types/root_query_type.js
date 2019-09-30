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
const RatingType = require("./rating_type")


const User = mongoose.model("users");
const Book = mongoose.model("books");
const Review = mongoose.model("reviews");
const Author = mongoose.model("authors");
const Shelf = mongoose.model("shelves");
const Rating = mongoose.model("ratings")


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
      resolve(parentValue) {
        return Review.find({})
      }
    },
    reviewByBookId: {
      type: new GraphQLList(ReviewType),
      args: { bookId: { type: GraphQLID } },
      async resolve(parentValue, { bookId }) {
         const reviews = await Review.find({ book: bookId }).populate(["book", "user"])
         return reviews
      }
    },
    ratingByUserAndBookId: {
      type: RatingType,
      args: { bookId: { type: GraphQLID }, userId: { type: GraphQLID} },
      async resolve(parentValue, { bookId, userId }) {
        let rating = await Rating.findOne({
          $and: [
            { book: mongoose.Types.ObjectId(bookId) },
            { user: mongoose.Types.ObjectId(userId) } 
          ]
        })
        return rating
      }
    }
  })
});

module.exports = RootQueryType;
