const graphqldate = require("graphql-iso-date")
const { GraphQLDateTime } = graphqldate
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} = graphql;
const mongoose = require("mongoose");

const UserType = require("./types/user_type");
const BookType = require("./types/book_type")
const AuthorType = require("./types/author_type")
const CharacterType = require("./types/character_type")
const CommentType = require("./types/comment_type")
const GenreType = require("./types/genre_type")
const LikeType = require("./types/like_type")
const PublisherType = require("./types/publisher_type")
const QuestionType = require("./types/question_type")
const RatingType = require("./types/rating_type")
const ReviewType = require("./types/review_type")
const SeriesType = require("./types/series_type")
const SettingType = require("./types/setting_type")
const ShelfType = require("./types/shelf_type")

const AuthService = require("../services/auth");


const User = mongoose.model("users");
const Book = mongoose.model("books")
const Author = mongoose.model("authors")
const Character = mongoose.model("characters")
const Comment = mongoose.model("comments")
const Genre = mongoose.model("genres")
const Like = mongoose.model("likes")
const Publisher = mongoose.model("publishers")
const Question = mongoose.model("questions")
const Rating = mongoose.model("ratings")
const Review = mongoose.model("reviews")
const Series = mongoose.model("series")
const Setting = mongoose.model("settings")
const Shelf = mongoose.model("shelves")

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      async resolve(_, { name, description, weight }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        // if our service returns true then our product is good to save!
        // anything else and we'll throw an error
        if (validUser.loggedIn) {
          return new Product({ name, description, weight }).save();
        } else {
          throw new Error(
            "Sorry, you need to be logged in to create a product."
          );
        }
      }
    },

    createBook: {
      type: BookType,
      args: { 
        title: { type: new GraphQLNonNull(GraphQLString) },
        coverPhoto: { type: new GraphQLNonNull(GraphQLString) },
        coverType: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        publishDate: { type: new GraphQLNonNull(GraphQLDateTime)},
        edition: { type: new GraphQLNonNull(GraphQLString) },
        pages: { type: new GraphQLNonNull(GraphQLInt) },
        isbn: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { title, coverPhoto, coverType, description, 
      publishDate, edition, pages, isbn}){
        return new Book({ title, coverPhoto, coverType, description,
        publishDate, edition, pages, isbn }).save()
      }
    },

    deleteBook: {
      type: BookType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Book.deleteOne({ _id })
      }
    },

    createAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        profilePhoto: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: new GraphQLNonNull(GraphQLString) },
        twitter: { type: new GraphQLNonNull(GraphQLString) },
        bio: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { name, profilePhoto,
         website, twitter, bio }) {
        return new Author({ name, profilePhoto,
           website, twitter, bio }).save()
      }
    },

    deleteAuthor: {
      type: AuthorType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Author.deleteOne({ _id })
      }
    },

    createCharacter: {
      type: CharacterType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name, description }) {
        return new Character({ name, description }).save()
      }
    },

    deleteCharacter: {
      type: CharacterType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Character.deleteOne({ _id })
      }
    },

    createComment: {
      type: CommentType,
      args: {
        comment: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLDateTime) }
      },
      resolve(parentValue, { comment, date }) {
        return new Comment({ comment, date }).save()
      }
    },

    deleteComment: {
      type: CommentType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Comment.deleteOne({ _id })
      }
    },

    
  }
});

module.exports = mutation;
