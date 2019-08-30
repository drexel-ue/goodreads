const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const Series = mongoose.model("series")

const SeriesType = new GraphQLObjectType({
    name: "SeriesType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        books: {
            type: new GraphQLList(require("./book_type")),
            resolve(parentValue) {
                return Series.findById(parentValue.id).populate("books")
            } 
        }
    })
})

module.exports = SeriesType