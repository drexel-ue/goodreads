const graphql = require("graphql");
const { GraphQLInt, GraphQLObjectType, GraphQLID } = graphql;
const UserType = require("./user_type");
const BookType = require("./book_type");

const RatingType = new GraphQLObjectType({
  name: "RatingType",
  fields: () => ({
    _id: { type: GraphQLID },
    stars: { type: GraphQLInt },
    user: { type: UserType },
    book: { type: BookType }
  })
});

module.exports = RatingType;
