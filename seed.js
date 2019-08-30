const faker = require("faker");
const User = require("./server/models/User");
const bcrypt = require("bcryptjs");
const db = require("./config/keys").MONGO_URI;
const mongoose = require("mongoose");

mongoose.connect(db, { useNewUrlParser: true }).then(async () => {
  console.log("Connected to MongoDB successfully");

  const demoUserData = {
    email: "DemoUser@badreads.com",
    password: "test123",
    name: "DemoUser"
  };

  const demoUser = await User.findOne({ email: "DemoUser@badreads.com" });

  if (!demoUser) {
    const hashedPassword = await bcrypt.hash(demoUserData.password, 10);
    demoUserData.password = hashedPassword;
    await new User(demoUserData).save();
    console.log("Demo User Saved");
  } else {
    console.log("No Demo User Needed");
  }
});
