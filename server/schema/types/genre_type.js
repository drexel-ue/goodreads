const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Genre = mongoose.model("genres");

const GenreType = new GraphQLObjectType({
  name: "GenreType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(require("./book_type")),
      async resolve(parentValue) {
        const genre = await Genre.findById(parentValue.id).populate("books");
        return genre.books;
      }
    }
  })
});

module.exports = GenreType;
