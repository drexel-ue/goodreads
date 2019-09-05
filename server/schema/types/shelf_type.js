const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const UserType = require("./user_type");
const Shelf = mongoose.model("shelves");

const ShelfType = new GraphQLObjectType({
  name: "ShelfType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    user: { type: UserType },
    bookIds: {
      type: new GraphQLList(GraphQLID),
      resolve(parentValue) {
        return parentValue.books;
      }
    },
    books: {
      type: new GraphQLList(require("./book_type")),
      async resolve(parentValue) {
        const shelf = await Shelf.findById(parentValue.id).populate("books");
        return shelf.books;
      }
    }
  })
});

module.exports = ShelfType;
