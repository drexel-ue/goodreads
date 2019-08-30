const faker = require("faker");
const User = require("./models/User");
const Board = require("./models/Board");
const Image = require("./models/Image");
const Pin = require("./models/Pin");
const bcrypt = require("bcryptjs");
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");