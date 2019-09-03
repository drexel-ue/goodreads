const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Publisher = mongoose.model("publishers");

const PublisherType = new GraphQLObjectType({
  name: "PublisherType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(require("./book_type")),
      async resolve(parentValue) {
        const publisher = await Publisher.findById(parentValue.id).populate(
          "books"
        );
        return publisher.books;
      }
    }
  })
});

module.exports = PublisherType;
