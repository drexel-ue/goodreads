const graphqldate = require("graphql-iso-date");
const { GraphQLDate } = graphqldate;
const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLList,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
const RatingType = require("./rating_type");
const PublisherType = require("./publisher_type");
const SeriesType = require("./series_type");
const Book = mongoose.model("books");

const BookType = new GraphQLObjectType({
  name: "BookType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    authors: {
      type: new GraphQLList(require("./author_type")),
      async resolve(parentValue) {
        const book = await Book.findById(parentValue.id).populate("authors");
        return book.authors;
      }
    },
    rating: { type: RatingType },
    coverPhoto: { type: GraphQLString },
    coverType: { type: GraphQLString },
    description: { type: GraphQLString },
    publishDate: { type: GraphQLDate },
    publisher: { type: PublisherType },
    genres: {
      type: new GraphQLList(require("./genre_type")),
      async resolve(parentValue) {
        const book = await Book.findById(parentValue.id).populate("genres");
        return book.genres;
      }
    },
    ratings: {
      type: new GraphQLList(require("./rating_type")),
      async resolve(parentValue) {
        const book = await Book.findById(parentValue.id).populate("ratings");
        return book.ratings;
      }
    },
    reviews: {
      type: new GraphQLList(require("./review_type")),
      async resolve(parentValue) {
        const book = await Book.findById(parentValue.id).populate("reviews");
        return book.reviews;
      }
    },
    series: { type: SeriesType },
    questions: {
      type: new GraphQLList(require("./question_type")),
      async resolve(parentValue) {
        const book = await Book.findById(parentValue.id).populate("questions");
        return book.questions;
      }
    },
    characters: {
      type: new GraphQLList(require("./character_type")),
      async resolve(parentValue) {
        const book = await Book.findById(parentValue.id).populate("characters");
        return book.characters;
      }
    },
    edition: { type: GraphQLString },
    pages: { type: GraphQLInt },
    isbn: { type: GraphQLString },
    settings: {
      type: new GraphQLList(require("./setting_type")),
      async resolve(parentValue) {
        const book = await Book.findById(parentValue.id).populate("settings");
        return book.settings;
      }
    }
  })
});

module.exports = BookType;
