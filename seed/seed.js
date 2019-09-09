const faker = require("faker");
const User = require("../server/models/User");
const Author = require("../server/models/Author");
const Book = require("../server/models/Book");
const Shelf = require("../server/models/Shelf");
const Character = require("../server/models/Character");
const publishers = require("./publishers");
const genres = require("./genres");
const settings = require("./settings");
const series = require("./series");
const bcrypt = require("bcryptjs");
const db = require("../config/keys").MONGO_URI;
const mongoose = require("mongoose");

mongoose.connect(db, { useNewUrlParser: true }).then(async () => {
  console.log("Connected to MongoDB successfully");

  const demoUserData = {
    email: "12@34.com",
    password: "test123",
    name: "DemoUser"
  };

  const demoUser = await User.findOne({ email: "12@34.com" });

  if (!demoUser) {
    const hashedPassword = await bcrypt.hash(demoUserData.password, 10);
    demoUserData.password = hashedPassword;
    await new User(demoUserData).save();
    console.log("Demo User Saved");
  } else {
    console.log("No Demo User Needed");
  }

  let authors = [];

  // Return random Genre ids
  const pickGenres = () => {
    let picked = [];
    for (
      let index = 0;
      index < faker.random.number({ min: 1, max: 4 });
      index++
    ) {
      const genre =
        genres[faker.random.number({ min: 0, max: genres.length - 1 })];
      if (!picked.includes(genre)) {
        picked.push(genre);
      }
    }
    return picked;
  };

  // Return random Author ids
  const pickCoAuthor = author => {
    let picked = [];

    const coAuthId =
      authors[faker.random.number({ min: 0, max: authors.length - 1 })]._id;

    if (coAuthId !== author._id) {
      picked.push(coAuthId);
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
      const setting =
        settings[faker.random.number({ min: 0, max: settings.length - 1 })];
      if (!picked.includes(setting)) {
        picked.push(setting);
      }
    }
    return picked;
  };

  let books = [];

  const genAuthors = () => {
    let authors = [];
    for (let index = 0; index < 20; index++) {
      authors.push(
        new Author({
          name: faker.name.firstName() + " " + faker.name.lastName(),
          profilePhoto: faker.internet.avatar(),
          website: faker.internet.url(),
          twitter: faker.internet.url(),
          genres: pickGenres(),
          bio: faker.lorem.paragraph()
        })
      );
      console.log(`Author ${index + 1} spawned`);
    }
    return authors;
  };

  const genBooks = author => {
    for (let index = 0; index < 20; index++) {
      const ble = [author._id].concat(pickCoAuthor(author));
      books.push(
        new Book({
          title: faker.hacker.phrase(),
          authors: ble,
          rating: faker.random.number({ min: 0, max: 5 }),
          coverPhoto: faker.image.image(),
          series:
            series[faker.random.number({ min: 0, max: series.length - 1 })],
          coverType: ["Hardcover", "Paperback"][
            faker.random.number({ min: 0, max: 1 })
          ],
          description: faker.lorem.paragraphs(15, "\n\n"),
          publishDate: Date.parse(faker.date.future()),
          genres: author.genres.slice(
            0,
            faker.random.number({ min: 1, max: author.genres.length - 1 })
          ),
          edition: ["First", "Second", "Limited"][
            faker.random.number({ min: 0, max: 2 })
          ],
          pages: faker.random.number({ min: 20, max: 200 }),
          isbn: faker.random.uuid(),
          settings: pickSettings()
        })
      );
      console.log(`Book ${index + 1} spawned`);
    }
    return books;
  };

  authors = genAuthors();

  for (let index = 0; index < authors.length; index++) {
    const publisher =
      publishers[faker.random.number({ min: 0, max: publishers.length - 1 })];
    const author = authors[index];
    author.books = genBooks(author);

    for (let bookIndex = 0; bookIndex < books.length; bookIndex++) {
      const book = books[bookIndex];
      book.settings = pickSettings();
      book.publisher = publisher;
    }
  }

  // Users.
  const genUsers = async () => {
    let users = [];
    const pass = await bcrypt.hash("test123", 10);
    for (let index = 0; index < 20; index++) {
      users.push(
        new User({
          email: faker.internet.email(),
          password: pass,
          name: faker.name.firstName() + " " + faker.name.lastName()
        })
      );
    }
    return users;
  };

  const users = await genUsers();

  const pickFriends = user => {
    let friends = [];
    for (
      let index = 0;
      index < faker.random.number({ min: 0, max: users.length - 1 });
      index++
    ) {
      const friend =
        users[faker.random.number({ min: 0, max: users.length - 1 })];
      if (friend._id !== user._id) friends.push(friend);
      friend.friends.push(user._id);
      friends.push(friend);
    }
    return friends;
  };

  const pickAuthorsToFollow = user => {
    let picked = [];
    for (
      let pickIndex = 0;
      pickIndex < faker.random.number({ min: 3, max: 7 });
      pickIndex++
    ) {
      const author =
        authors[faker.random.number({ min: 0, max: authors.length - 1 })];
      if (!picked.includes(author._id)) {
        picked.push(author._id);
        author.followers.push(user);
      }
    }
    return picked;
  };

  const pickBooks = () => {
    const pickedIds = [];
    for (
      let index = 0;
      index <
      faker.random.number({
        min: 1,
        max: books.length - 1
      });
      index++
    ) {
      const book =
        books[faker.random.number({ min: 0, max: books.length - 1 })];
      if (!pickedIds.includes(book._id)) pickedIds.push(book._id);
    }
    return pickedIds;
  };

  let characters = [];
  const genCharacters = async () => {
    for (let index = 0; index < 100; index++) {
      const selected = [];
      for (
        let index = 0;
        index < faker.random.number({ min: 10, max: 20 });
        index++
      ) {
        const option =
          books[faker.random.number({ min: 0, max: books.length - 1 })];
        if (!selected.includes(option)) selected.push(option);
      }
      const character = new Character({
        name: faker.name.firstName() + " " + faker.name.lastName(),
        description: faker.lorem.paragraph(),
        books: selected
      });
      for (let index = 0; index < selected.length; index++) {
        selected[index].characters.push(character);
      }
      console.log(`Character ${character.name} spawned`);
      characters.push(character);
    }
  };

  await genCharacters();

  let shelves = [];
  const genShelves = user => {
    const mustHaves = ["Currently Reading", "Want to read", "Read"];
    for (let index = 0; index < mustHaves.length; index++) {
      shelves.push(
        new Shelf({
          name: mustHaves[index],
          user: user,
          books: pickBooks()
        })
      );
    }
    for (let index = 0; index < 20; index++) {
      shelves.push(
        new Shelf({
          name: faker.internet.domainWord(),
          user: user,
          books: pickBooks()
        })
      );
      console.log(`Shelf ${index + 1} spawned`);
    }
    return shelves;
  };

  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    const book = books[faker.random.number({ min: 0, max: books.length - 1 })];
    const currentPage = faker.random.number({ min: 1, max: book.pages });

    user.friends = pickFriends(user);
    user.shelves = genShelves(user);
    user.followedAuthors = pickAuthorsToFollow(user);
    user.currentlyReading = book;
    user.currentPage = currentPage;

    console.log(`User ${index + 1} spawned`);
  }

  console.log("Commencing User inserts");
  await User.collection.insertMany(users);
  console.log("Users seeded");

  console.log("Commencing Author inserts");
  await Author.collection.insertMany(authors);
  console.log("Authors seeded");

  console.log("Commencing Book inserts");
  await Book.collection.insertMany(books);
  console.log("Books seeded");

  console.log("Commencing Shelf inserts");
  await Shelf.collection.insertMany(shelves);
  console.log("Shelves seeded");

  console.log("Commencing Character inserts");
  await Character.collection.insertMany(characters);
  console.log("Characters seeded");

  await mongoose.connection.close();
});
