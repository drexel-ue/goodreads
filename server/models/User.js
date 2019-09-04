const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkQeaUoawZR3nca9VClt8XQO38BxMqdRVOsfgzjYaLgzbJxjh"
  },
  date: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  currentPage: {
    type: Number,
    default: 420
  },
  currentlyReading: {
    type: Schema.Types.ObjectId,
    ref: "book",
    default: "5d6e955423a103754cd3e60e"
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "questions"
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews"
    }
  ],
  followedAuthors: [
    {
      type: Schema.Types.ObjectId,
      ref: "authors"
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  shelves: [
    {
      type: Schema.Types.ObjectId,
      ref: "shelves"
    }
  ]
});

UserSchema.statics.addQuestion = (userId, questionId) => {
  const User = mongoose.model("users");
  const Question = mongoose.model("questions");

  return User.findById(userId).then(user => {
    return Question.findById(questionId).then(question => {
      user.questions.push(question);
      question.user = userId;

      return Promise.all([user.save(), question.save()]).then(
        ([user, question]) => user
      );
    });
  });
};

UserSchema.statics.removeQuestion = (userId, questionId) => {
  const User = mongoose.model("users");
  const Question = mongoose.model("questions");

  return User.findById(userId).then(user => {
    return Question.findById(questionId).then(question => {
      user.questions.pull(question);
      Question.findByIdAndRemove(questionId)

      return Promise.all([user.save(), question.save()]).then(
        ([user, question]) => user
      );
    });
  });
};

UserSchema.statics.addReview = (userId, reviewId) => {
  const User = mongoose.model("users");
  const Review = mongoose.model("reviews");

  return User.findById(userId).then(user => {
    return Review.findById(reviewId).then(review => {
      user.reviews.push(review);
      review.user = userId;

      return Promise.all([user.save(), review.save()]).then(
        ([user, review]) => user
      );
    });
  });
};

UserSchema.statics.removeReview = (userId, reviewId) => {
  const User = mongoose.model("users");
  const Review = mongoose.model("reviews");

  return User.findById(userId).then(user => {
    return Review.findById(reviewId).then(review => {
      user.reviews.pull(review);
      Review.findByIdAndRemove(reviewId)

      return Promise.all([user.save(), review.save()]).then(
        ([user, review]) => user
      );
    });
  });
};

UserSchema.statics.addFollowedAuthor = (userId, authorId) => {
  const User = mongoose.model("users");
  const Author = mongoose.model("authors");

  return User.findById(userId).then(user => {
    return Author.findById(authorId).then(author => {
      user.followedAuthors.push(author);
      author.followers.push(user)

      return Promise.all([user.save(), author.save()]).then(
        ([user, author]) => user
      );
    });
  });
};

UserSchema.statics.removeFollowedAuthor = (userId, authorId) => {
  const User = mongoose.model("users");
  const Author = mongoose.model("authors");

  return User.findById(userId).then(user => {
    return Author.findById(authorId).then(author => {
      user.followedAuthors.pull(author);
      author.followers.pull(user)

      return Promise.all([user.save(), author.save()]).then(
        ([user, author]) => user
      );
    });
  });
};

UserSchema.statics.addShelf = (userId, shelfId) => {
  const User = mongoose.model("users");
  const Shelf = mongoose.model("shelves");

  return User.findById(userId).then(user => {
    return Shelf.findById(shelfId).then(shelf => {
      user.shelves.push(shelf);
      shelf.user = userId

      return Promise.all([user.save(), shelf.save()]).then(
        ([user, shelf]) => user
      );
    });
  });
};

UserSchema.statics.removeShelf = (userId, shelfId) => {
  const User = mongoose.model("users");
  const Shelf = mongoose.model("shelves");

  return User.findById(userId).then(user => {
    return Shelf.findById(shelfId).then(shelf => {
      user.shelves.pull(shelf);
      Shelf.findByIdAndRemove(shelfId)

      return Promise.all([user.save(), shelf.save()]).then(
        ([user, shelf]) => user
      );
    });
  });
};



module.exports = mongoose.model("users", UserSchema);

