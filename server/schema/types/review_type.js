const graphqldate = require("graphql-iso-date");
const { GraphQLDateTime } = graphqldate;
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const UserType = require("./user_type");
const BookType = require("./book_type");

const ReviewType = new GraphQLObjectType({
  name: "ReviewType",
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLID },
    book: { type: GraphQLID },
    content: { type: GraphQLString },
    hidden: { type: GraphQLBoolean },
    // dateStarted: { type: GraphQLDateTime },
    // dateFinished: { type: GraphQLDateTime },
    recommendTo: { type: GraphQLString },
    // recommendBy: { type: GraphQLID },
    privateNotes: { type: GraphQLString },
    owned: { type: GraphQLBoolean },
    postToBlog: { type: GraphQLBoolean },
    addToFeed: { type: GraphQLBoolean },
    // date: { type: GraphQLDateTime }
  })
});

module.exports = ReviewType;
