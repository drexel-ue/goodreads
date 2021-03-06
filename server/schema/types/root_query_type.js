const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
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
      async resolve(_, { _id }) {
        return await User.findById(_id).populate({
          path: "shelves",
          populate: {
            path: "books",
            populate: {
              path: "authors"
            }
          }
        });
      }
    },
    nonFriends: {
      type: new GraphQLList(UserType),
      args: {
        offset: { type: GraphQLInt },
        queryString: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      async resolve(_, { offset, queryString, userId }) {
        const regexp = new RegExp("^" + queryString, "i");
        return await User.find({
          $and: [
            { $or: [{ name: regexp }, { email: regexp }] },
            {
              friends: {
                $not: { $regex: mongoose.Types.ObjectId(userId).toString() }
              }
            }
          ]
        })
          .populate({
            path: "currentlyReading",
            populate: {
              path: "authors"
            }
          })
          .populate("shelves")
          .skip(offset)
          .limit(30);
      }
    },
    friends: {
      type: new GraphQLList(UserType),
      args: {
        offset: { type: GraphQLInt },
        queryString: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      async resolve(_, { offset, queryString, userId }) {
        const regexp = new RegExp("^" + queryString, "i");
        return await User.find({
          $and: [
            { $or: [{ name: regexp }, { email: regexp }] },
            { friends: mongoose.Types.ObjectId(userId) }
          ]
        })
          .populate({
            path: "currentlyReading",
            populate: {
              path: "authors"
            }
          })
          .populate("shelves")
          .skip(offset)
          .limit(30);
      }
    },
    maybeFriends: {
      type: new GraphQLList(UserType),
      args: {
        userId: { type: GraphQLID }
      },
      async resolve(_, { userId }) {
        const user = await User.findById(userId).populate({
          path: "friends",
          populate: { path: "shelves" }
        });
        return user.friends;
      }
    },
    friendIds: {
      type: new GraphQLList(GraphQLID),
      args: { userId: { type: GraphQLID } },
      async resolve(_, { userId }) {
        const user = await User.findById(userId);
        return user.friends;
      }
    },
    book: {
      type: BookType,
      args: { _id: { type: GraphQLID } },
      async resolve(_, { _id }) {
        return await Book.findById(_id).populate(["authors", "characters"]);
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
      async resolve(_, { genreString }) {
        const pattern = new RegExp(genreString, "i");
        return await Book.find({ genres: pattern })
          .populate(["authors", "ratings"])
          .limit(6);
      }
    },
    booksBySeries: {
      type: new GraphQLList(BookType),
      args: { series: { type: GraphQLString } },
      async resolve(_, { series }) {
        const pattern = new RegExp(series, "i");
        return await Book.find({ series: pattern }).populate("authors");
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
        const pattern = new RegExp(genreString, "i");
        return Book.find({ genres: pattern })
          .populate(["authors", "ratings"])
          .limit(24);
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
      async resolve(_) {
        return await Review.find({}).populate(["user", "book"]);
      }
    },
    bookSearch: {
      type: new GraphQLList(BookType),
      args: {
        queryString: { type: GraphQLString },
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      async resolve(_, { queryString, offset, limit }) {
        let books = [];
        if (queryString.length > 0) {
          const pattern = new RegExp("^" + queryString, "i");
          if (queryString.length > 0)
            books = await Book.find({
              $or: [{ title: pattern }, { series: pattern }, { isbn: pattern }]
            })
              .populate("authors")
              .skip(offset)
              .limit(limit);
          const authors = await Author.find({ name: pattern })
            .populate({ path: "books", populate: "authors" })
            .limit(limit);

          authors.forEach(author => {
            books.push(...author.books);
          });
        }
        if (books.length > limit) books = books.slice(0, limit);
        return books;
      }
    },
    ratedByUser: {
      type: new GraphQLList(GraphQLBoolean),
      args: { bookId: { type: GraphQLID }, userId: { type: GraphQLID } },
      async resolve(_, { bookId, userId }) {
        const book = await Book.findById(bookId).populate([
          "ratings",
          "reviews"
        ]);
        return [
          book.ratings.some(rating => rating.user.toString() === userId),
          book.reviews.some(review => review.user.toString() === userId)
        ];
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
