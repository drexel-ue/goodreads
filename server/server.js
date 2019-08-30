const models = require("./models/index");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const schema = require("./schema/schema");
const expressGraphQL = require("express-graphql");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      // we are receiving the request and can check for our
      // auth token under headers
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());

module.exports = app;
