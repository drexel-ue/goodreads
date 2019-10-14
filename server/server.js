const models = require("./models/index");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const schema = require("./schema/schema");
const expressGraphQL = require("express-graphql");
const cors = require("cors");

const app = express();

if (process.env.NODE_ENV === "production") {
  console.log("hmm");
  app.use(express.static("client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(cors());

app.use(bodyParser.json());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
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
  .connect(db, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

module.exports = app;
