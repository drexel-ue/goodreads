const faker = require("faker");
const User = require("../server/models/User");
const Author = require("../server/models/Author");
const Genre = require("../server/models/Genre");
const Publisher = require("../server/models/Publisher");
const Book = require("../server/models/Book");
const Setting = require("../server/models/Setting");
const Shelf = require("../server/models/Shelf");
const topPublishers = require("./publishers");
const genreTitles = require("./genres");
const topSettings = require("./settings");
const bcrypt = require("bcryptjs");
const db = require("../config/keys").MONGO_URI;
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

  // Genres.
  let genres = await Genre.find();
  if (genres.length === 0) {
    genres = await Genre.create(genreTitles.map(title => ({ name: title })));
    console.log("Genres Seeded");
  } else {
    console.log("Genre Seed Not Needed");
  }

  // Publishers.
  let publishers = await Publisher.find();
  if (publishers.length === 0) {
    publishers = await Publisher.create(
      topPublishers.map(name => ({ name: name }))
    );

    console.log("Publishers Seeded");
  } else {
    console.log("Publisher Seed Not Needed");
  }

  // Settings.
  let settings = await Setting.find();
  if (settings.length === 0) {
    for (let index = 0; index < topSettings.length; index++) {
      settings.push(await new Setting({ setting: topSettings[index] }).save());
      if (index === topSettings.length - 1) {
        console.log("Settings Seeded");
      }
    }
  } else {
    console.log("Setting Seed Not Needed");
  }

  let authors = [];

  // Return random Genre ids
  const pickGenres = () => {
    let ids = [];
    for (
      let index = 0;
      index < faker.random.number({ min: 1, max: 4 });
      index++
    ) {
      const id =
        genres[faker.random.number({ min: 0, max: genres.length - 1 })]._id;
      if (!ids.includes(id)) {
        ids.push(id);
      }
    }
    return ids;
  };

  // Return random Author ids
  const pickCoAuthor = author => {
    let picked = [];

    const coAuth =
      authors[faker.random.number({ min: 0, max: authors.length - 1 })]._id;

    if (coAuth !== author._id) {
      picked.push(coAuth);
    }

    return picked;
  };

  // Return random Setting ids
  const pickSettings = () => {
    let picked = [];
    for (
      let pickIndex = 0;
      pickIndex < faker.random.number({ min: 3, max: 10 });
      pickIndex++
    ) {
      const id =
        settings[faker.random.number({ min: 0, max: settings.length - 1 })]._id;
      if (!picked.includes(id)) {
        picked.push(id);
      }
    }
    return picked;
  };

  let books = [];

  const genAuthors = () => {
    let authors = [];
    for (let index = 0; index < 5; index++) {
      authors.push({
        name: faker.name.firstName() + " " + faker.name.lastName(),
        profilePhoto: faker.internet.avatar(),
        website: faker.internet.url(),
        twitter: faker.internet.url(),
        genres: pickGenres(),
        bio: faker.lorem.paragraph()
      });
    }
    return authors;
  };

  const genBooks = author => {
    let books = [];

    for (let index = 0; index < 5; index++) {
      const ble = [author._id].concat(pickCoAuthor(author));
      books.push({
        title: faker.hacker.phrase(),
        authors: ble,
        rating: faker.random.number({ min: 0, max: 5 }),
        coverPhoto: faker.image.image(),
        coverType: ["Hardcover", "Paperback"][
          faker.random.number({ min: 0, max: 1 })
        ],
        description: faker.lorem.paragraphs(3),
        publishDate: Date.parse(faker.date.future()),
        genres: author.genres.slice(
          0,
          faker.random.number({ min: 1, max: author.genres.length })
        ),
        edition: ["First", "Second", "Limited"][
          faker.random.number({ min: 0, max: 2 })
        ],
        pages: faker.random.number({ min: 100, max: 1000 }),
        isbn: faker.random.uuid(),
        settings: pickSettings()
      });
    }
    return books;
  };

  const authorDocs = await Author.collection.insertMany(genAuthors());

  authors = authorDocs.ops;

  for (let index = 0; index < authors.length; index++) {
    const publisher =
      publishers[faker.random.number({ min: 0, max: publishers.length - 1 })];
    const bookDocs = await Book.collection.insertMany(genBooks(authors[index]));
    books = Object.values(bookDocs.insertedIds);

    books = await Book.find({
      _id: {
        $in: books
      }
    });

    for (let bookIndex = 0; bookIndex < books.length; bookIndex++) {
      const setting =
        settings[faker.random.number({ min: 0, max: settings.length - 1 })];
      books[bookIndex].setting = setting;
      books[bookIndex].publisher = publisher;
      setting.books.push(books[bookIndex]);
      await setting.save();
      await books[bookIndex].save();
    }

    publisher.books = books;
  }

  // Users.
  let users = [];

  const pickFriends = async user => {
    let ids = [];
    for (
      let index = 0;
      index < faker.random.number({ min: 0, max: users.length - 1 });
      index++
    ) {
      const id = users[faker.random.number({ min: 0, max: users.length - 1 })];
      if (id !== user._id) ids.push(id);

      let friend;
      try {
        friend = await User.findById(id);
      } catch (e) {
        console.log(">>>>", e);
      }

      if (!friend.friends.includes(user._id)) {
        friend.friends.push(user._id);
      }

      await friend.save();
    }
    return ids;
  };

  const pickAuthorsToFollow = () => {
    let picked = [];
    for (
      let pickIndex = 0;
      pickIndex < faker.random.number({ min: 3, max: 7 });
      pickIndex++
    ) {
      const id =
        authors[faker.random.number({ min: 0, max: authors.length - 1 })]._id;
      if (!picked.includes(id)) {
        picked.push(id);
      }
    }
    return picked;
  };

  for (let userIndex = 0; userIndex < 4; userIndex++) {
    const userData = {
      email: faker.internet.email(),
      password: "test123",
      name: faker.name.firstName() + " " + faker.name.lastName(),
      currentlyReading:
        books[faker.random.number({ min: 0, max: books.length - 1 })]
    };
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    let user = new User(userData);

    const authIds = pickAuthorsToFollow();
    user.followedAuthors = authIds;

    for (let index = 0; index < authIds.length; index++) {
      const author = await Author.findById(authIds[index]);
      author.followers.push(user);
      await author.save();
    }

    const pickBooks = () => {
      let picked = [];
      for (
        let pickIndex = 0;
        pickIndex < faker.random.number({ min: 3, max: books.length });
        pickIndex++
      ) {
        const id =
          books[faker.random.number({ min: 0, max: books.length - 1 })]._id;
        if (!picked.includes(id)) {
          picked.push(id);
        }
      }
      return picked;
    };

    // Shelves.
    for (let shelfIndex = 0; shelfIndex < 5; shelfIndex++) {
      const shelfData = {
        name: faker.hacker.adjective(),
        user: user._id,
        books: pickBooks(),
        profilePhoto: faker.internet.avatar()
      };

      const shelf = await new Shelf(shelfData).save();
      user.shelves.push(shelf);
    }

    users.push(user._id);

    if (users.length > 1) {
      user.friends = await pickFriends(user);
      try {
        await user.save();
      } catch (e) {
        console.log(e);
      }
    } else {
      await user.save();
    }

    if (userIndex === 9) {
      console.log("Users Seeded");
    }
  }

  await mongoose.connection.close();
});
