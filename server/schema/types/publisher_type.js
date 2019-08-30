const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Publisher = mongoose.model("publishers")

const PublisherType = new GraphQLObjectType({
    name: "PublisherType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(require("./book_type")),
            resolve(parentValue) {
                return Publisher.findById(parentValue.id).populate("books")
            }
        }
    })
})

module.exports = PublisherType