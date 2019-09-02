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
    for (let index = 0; index < genreTitles.length; index++) {
      genres.push(await new Genre({ name: genreTitles[index] }).save());
      if (index === genreTitles.length - 1) {
        console.log("Genres Seeded");
      }
    }
  } else {
    console.log("Genre Seed Not Needed");
  }

  // Publishers.
  let publishers = await Publisher.find();
  if (publishers.length === 0) {
    for (let index = 0; index < topPublishers.length; index++) {
      publishers.push(
        await new Publisher({ name: topPublishers[index] }).save()
      );
      if (index === topPublishers.length - 1) {
        console.log("Publishers Seeded");
      }
    }
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
  const pickAuthors = () => {
    let picked = [];
    if (faker.random.boolean() && authors.length > 2) {
      for (let pickIndex = 0; pickIndex < 2; pickIndex++) {
        const id =
          authors[faker.random.number({ min: 0, max: authors.length - 1 })]._id;
        if (!picked.includes(id)) {
          picked.push(id);
        }
      }
    } else {
      picked.push(
        authors[faker.random.number({ min: 0, max: authors.length - 1 })]._id
      );
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

  // Authors.
  for (let authorIndex = 0; authorIndex < 20; authorIndex++) {
    const authorData = {
      name: faker.name.firstName() + " " + faker.name.lastName(),
      profilePhoto: faker.internet.avatar(),
      website: faker.internet.url(),
      twitter: faker.internet.url(),
      genres: pickGenres(),
      bio: faker.lorem.paragraph()
    };
    const author = await new Author(authorData).save();
    authors.push(author);

    // Books.
    for (let bookIndex = 0; bookIndex < 20; bookIndex++) {
      const publisher =
        publishers[faker.random.number({ min: 0, max: publishers.length - 1 })];
      const pickedSettings = [];
      const setIds = pickSettings();
      for (let setIndex = 0; setIndex < setIds.length; setIndex++) {
        const set = await Setting.findById(setIds[setIndex]);
        pickedSettings.push(set);
      }

      const bookData = {
        title: faker.hacker.phrase(),
        authors: pickAuthors(),
        rating: faker.random.number({ min: 0, max: 5 }),
        coverPhoto: faker.image.image(),
        coverType: ["Hardcover", "Paperback"][
          faker.random.number({ min: 0, max: 1 })
        ],
        description: faker.lorem.paragraphs(3),
        publishDate: Date.parse(faker.date.future()),
        publisher: publisher,
        genres: author.genres.slice(
          0,
          faker.random.number({ min: 1, max: author.genres.length })
        ),
        edition: ["First", "Second", "Limited"][
          faker.random.number({ min: 0, max: 2 })
        ],
        pages: faker.random.number({ min: 100, max: 1000 }),
        isbn: faker.random.uuid(),
        settings: pickedSettings
      };

      const book = await new Book(bookData).save();
      books.push(book);

      publisher.books.push(book);
      await publisher.save();

      author.books.push(book._id);

      for (let index = 0; index < pickedSettings.length; index++) {
        const set = pickedSettings[index];
        set.books.push(book);
        await set.save();
      }

      if (bookIndex === 19) {
        await author.save();
      }
    }

    if (authorIndex === 19) {
      console.log("Authors Seeded");
    }
  }

  // Users.
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
  for (let userIndex = 0; userIndex < 20; userIndex++) {
    const userData = {
      email: faker.internet.email(),
      password: "test123",
      name: faker.name.firstName() + " " + faker.name.lastName()
    };
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const user = new User(userData);

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
    for (let shelfIndex = 0; shelfIndex < 10; shelfIndex++) {
      const shelfData = {
        name: faker.hacker.adjective(),
        user: user._id,
        books: pickBooks(),
        profilePhoto: faker.internet.avatar()
      };

      const shelf = await new Shelf(shelfData).save();
      user.shelves.push(shelf);
    }

    await user.save();

    if (userIndex === 19) {
      console.log("Users Seeded");
    }
  }

  await mongoose.connection.close();
});
