const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const Setting = mongoose.model("settings")

const SettingType = new GraphQLObjectType({
    name: "SettingType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        setting: { type: GraphQLString },
        books: {
            type: new GraphQLList(require("./book_type")),
            resolve(parentValue) {
                return Setting.findById(parentValue.id).populate("books")            
            }
        }
    })
})

module.exports = SettingType