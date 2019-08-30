const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const UserType = require("./user_type")
const Shelf = mongoose.model("shelves")

const ShelfType = new GraphQLObjectType({
    name: "ShelfType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type, GraphQLString },
        user: { type: UserType },
        books: {
            type: new GraphQLList(require("./book_type")),
            resolve(parentValue) {
                return Shelf.findById(parentValue.id).populate("books")
            }
        }
    })
})

module.exports = ShelfType