const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Series = mongoose.model("series");

const SeriesType = new GraphQLObjectType({
  name: "SeriesType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    books: {
      type: new GraphQLList(require("./book_type")),
      async resolve(parentValue) {
        const series = await Series.findById(parentValue.id).populate("books");
        return series.books;
      }
    }
  })
});

module.exports = SeriesType;
