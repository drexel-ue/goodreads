const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Setting = mongoose.model("settings");

const SettingType = new GraphQLObjectType({
  name: "SettingType",
  fields: () => ({
    _id: { type: GraphQLID },
    setting: { type: GraphQLString },
    books: {
      type: new GraphQLList(require("./book_type")),
      async resolve(parentValue) {
        const setting = await Setting.findById(parentValue.id).populate(
          "books"
        );
        return setting.books;
      }
    }
  })
});

module.exports = SettingType;
