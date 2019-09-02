const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Character = mongoose.model("characters");

const CharacterType = new GraphQLObjectType({
  name: "CharacterType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    books: {
      type: new GraphQLList(require("./book_type")),
      async resolve(parentValue) {
        const character = await Character.findById(parentValue.id).populate(
          "books"
        );
        return character.books;
      }
    }
  })
});

module.exports = CharacterType;
