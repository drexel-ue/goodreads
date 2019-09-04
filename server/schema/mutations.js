const graphqldate = require("graphql-iso-date");
const { GraphQLDateTime } = graphqldate;
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;
const mongoose = require("mongoose");

const UserType = require("./types/user_type");
const BookType = require("./types/book_type");
const AnswerType = require("./types/answer_type");
const AuthorType = require("./types/author_type");
const CharacterType = require("./types/character_type");
const CommentType = require("./types/comment_type");
const LikeType = require("./types/like_type");
const QuestionType = require("./types/question_type");
const RatingType = require("./types/rating_type");
const ReviewType = require("./types/review_type");
const SeriesType = require("./types/series_type");
const ShelfType = require("./types/shelf_type");

const AuthService = require("../services/auth");

const Book = mongoose.model("books");
const Answer = mongoose.model("answers");
const Author = mongoose.model("authors");
const Character = mongoose.model("characters");
const Comment = mongoose.model("comments");
const Like = mongoose.model("likes");
const Question = mongoose.model("questions");
const Rating = mongoose.model("ratings");
const Review = mongoose.model("reviews");
const Series = mongoose.model("series");
const Shelf = mongoose.model("shelves");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      async resolve(_, { token }, ctx) {
        return await AuthService.verifyUser({ token: ctx.token || token });
      }
    },

    createBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLID },
        coverPhoto: { type: new GraphQLNonNull(GraphQLString) },
        coverType: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        publishDate: { type: new GraphQLNonNull(GraphQLDateTime) },
        publisher: { type: new GraphQLNonNull(GraphQLString) },
        edition: { type: new GraphQLNonNull(GraphQLString) },
        series: { type: GraphQLID },
        pages: { type: new GraphQLNonNull(GraphQLInt) },
        isbn: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(
        parentValue,
        {
          title,
          rating,
          coverPhoto,
          coverType,
          description,
          publishDate,
          publisher,
          edition,
          series,
          pages,
          isbn
        }
      ) {
        return new Book({
          title,
          rating,
          coverPhoto,
          coverType,
          description,
          publishDate,
          publisher,
          edition,
          series,
          pages,
          isbn
        }).save();
      }
    },

    deleteBook: {
      type: BookType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Book.deleteOne({ _id });
      }
    },

    updateBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        rating: { type: GraphQLID },
        coverPhoto: { type: GraphQLString },
        coverType: { type: GraphQLString },
        description: { type: GraphQLString },
        publishDate: { type: GraphQLDateTime },
        publisher: { type: GraphQLString },
        edition: { type: GraphQLString },
        series: { type: GraphQLID },
        pages: { type: GraphQLInt },
        isbn: { type: GraphQLString }
      },
      resolve(
        parentValue,
        {
          id,
          title,
          rating,
          coverPhoto,
          coverType,
          description,
          publishDate,
          publisher,
          edition,
          series,
          pages,
          isbn
        }
      ) {
        const updateBookField = {};

        if (title) updateBookField.title = title;
        if (rating) updateBookField.rating = rating;
        if (coverPhoto) updateBookField.coverPhoto = coverPhoto;
        if (coverType) updateBookField.coverType = coverType;
        if (description) updateBookField.description = description;
        if (publishDate) updateBookField.publishDate = publishDate;
        if (publisher) updateBookField.publisher = publisher;
        if (edition) updateBookField.edition = edition;
        if (series) updateBookField.series = series;
        if (pages) updateBookField.pages = pages;
        if (isbn) updateBookField.isbn = isbn;

        return Book.findOneAndUpdate(
          { _id: id },
          { $set: updateBookField },
          { new: true },
          (err, book) => {
            return book;
          }
        );
      }
    },

    // from Book.js statics
    addBookSetting: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        setting: { type: GraphQLString }
      },
      async resolve(parentValue, { bookId, setting }) {
        return await Book.addSetting(bookId, setting);
      }
    },

    removeBookSetting: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        setting: { type: GraphQLString }
      },
      async resolve(parentValue, { bookId, setting }) {
        return await Book.removeSetting(bookId, setting);
      }
    },

    addBookCharacter: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        characterId: { type: GraphQLID }
      },
      resolve(parentValue, { bookId, characterId }) {
        return Book.addCharacter(bookId, characterId);
      }
    },

    removeBookCharacter: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        characterId: { type: GraphQLID }
      },
      resolve(parentValue, { bookId, characterId }) {
        return Book.removeCharacter(bookId, characterId);
      }
    },

    addBookGenre: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        genre: { type: GraphQLString }
      },
      async resolve(parentValue, { bookId, genre }) {
        return await Book.addGenre(bookId, genre);
      }
    },

    removeBookGenre: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        genre: { type: GraphQLString }
      },
      async resolve(parentValue, { bookId, genre }) {
        return await Book.removeGenre(bookId, genre);
      }
    },

    addBookAuthor: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        authorId: { type: GraphQLID }
      },
      resolve(parentValue, { bookId, authorId }) {
        return Book.addAuthor(bookId, authorId);
      }
    },

    removeBookAuthor: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        authorId: { type: GraphQLID }
      },
      resolve(parentValue, { bookId, authorId }) {
        return Book.removeAuthor(bookId, authorId);
      }
    },

    addBookRating: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        ratingId: { type: GraphQLID }
      },
      resolve(parentValue, { bookId, ratingId }) {
        return Book.addRating(bookId, ratingId);
      }
    },

    removeBookRating: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        ratingId: { type: GraphQLID }
      },
      resolve(parentValue, { bookId, ratingId }) {
        return Book.removeRating(bookId, ratingId);
      }
    },

    addBookQuestion: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        questionId: { type: GraphQLID }
      },
      resolve(parentValue, { bookId, questionId }) {
        return Book.addQuestion(bookId, questionId);
      }
    },

    removeBookQuestion: {
      type: BookType,
      args: {
        bookId: { type: GraphQLID },
        questionId: { type: GraphQLID }
      },
      resolve(parentValue, { bookId, questionId }) {
        return Book.removeQuestion(bookId, questionId);
      }
    },

    addUserQuestion: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        questionId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, questionId }) {
        return User.addQuestion(userId, questionId)
      } 
    },

    removeUserQuestion: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        questionId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, questionId }) {
        return User.removeQuestion(userId, questionId)
      } 
    },

    addUserReview: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        reviewId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, reviewId }) {
        return User.addReview(userId, reviewId)
      } 
    },

    removeUserReview: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        reviewId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, reviewId }) {
        return User.removeReview(userId, reviewId)
      } 
    },

    addUserFollowedAuthor: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        authorId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, authorId }) {
        return User.addFollowedAuthor(userId, authorId)
      } 
    },

    removeUserFollowedAuthor: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        authorId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, authorId }) {
        return User.removeFollowedAuthor(userId, authorId)
      } 
    },

    addUserShelf: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        shelfId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, shelfId }) {
        return User.addShelf(userId, shelfId)
      } 
    },

    removeUserShelf: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        shelfId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, shelfId }) {
        return User.removeShelf(userId, shelfId)
      } 
    },



    createAnswer: {
      type: AnswerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: GraphQLID },
        book: { type: GraphQLID }
      },
      resolve(parentValue, { name, user, book }) {
        return new Answer({ name, user, book }).save();
      }
    },

    deleteAnswer: {
      type: AnswerType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Answer.deleteOne({ _id });
      }
    },

    updateAnswer: {
      type: AnswerType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parentValue, { id, name }) {
        const updateAnswerField = {};
        updateAnswerField.name = name;
        return Answer.findOneAndUpdate(
          { _id: id },
          { $set: updateAnswerField },
          { new: true },
          (err, answer) => {
            return answer;
          }
        );
      }
    },

    addAnswerLike: {
      type: AnswerType,
      args: {
        answerId: { type: GraphQLID },
        likeId: { type: GraphQLID }
      },
      resolve(parentValue, { answerId, likeId }) {
        return Answer.addLike(answerId, likeId)
      }
    },

    removeAnswerLike: {
      type: AnswerType,
      args: {
        answerId: { type: GraphQLID },
        likeId: { type: GraphQLID }
      },
      resolve(parentValue, { answerId, likeId }) {
        return Answer.removeLike(answerId, likeId)
      }
    },

    addAnswerComment: {
      type: AnswerType,
      args: {
        answerId: { type: GraphQLID },
        commentId: { type: GraphQLID }
      },
      resolve(parentValue, { answerId, commentId }) {
        return Answer.addComment(answerId, commentId)
      }
    },

    removeAnswerComment: {
      type: AnswerType,
      args: {
        answerId: { type: GraphQLID },
        commentId: { type: GraphQLID }
      },
      resolve(parentValue, { answerId, commentId }) {
        return Answer.removeComment(answerId, commentId)
      }
    },


    createAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        profilePhoto: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: new GraphQLNonNull(GraphQLString) },
        twitter: { type: new GraphQLNonNull(GraphQLString) },
        bio: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name, profilePhoto, website, twitter, bio }) {
        return new Author({ name, profilePhoto, website, twitter, bio }).save();
      }
    },

    deleteAuthor: {
      type: AuthorType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Author.deleteOne({ _id });
      }
    },

    updateAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        profilePhoto: { type: GraphQLString },
        website: { type: GraphQLString },
        twitter: { type: GraphQLString },
        bio: { type: GraphQLString }
      },
      resolve(parentValue, { id, name, profilePhoto, website, twitter, bio }) {
        const updateAuthorField = {};

        if (name) updateAuthorField.name = name;
        if (profilePhoto) updateAuthorField.profilePhoto = profilePhoto;
        if (website) updateAuthorField.website = website;
        if (twitter) updateAuthorField.twitter = twitter;
        if (bio) updateAuthorField.bio = bio;

        return Author.findOneAndUpdate(
          { _id: id },
          { $set: updateAuthorField },
          { new: true },
          (err, author) => {
            return author;
          }
        );
      }
    },

    addAuthorGenre: {
      type: AuthorType,
      args: {
        authorId: { type: GraphQLID },
        genreId: { type: GraphQLID }
      },
      resolve(parentValue, { authorId, genreId }) {
        return Author.addGenre(authorId, genreId)
      }
    },

    removeAutherGenre: {
      type: AuthorType,
      args: {
        authorId: { type: GraphQLID },
        genreId: { type: GraphQLID }
      },
      resolve(parentValue, { authorId, genreId }) {
        return Author.removeGenre(authorId, genreId)
      }
    },

    addAuthorFollower: {
      type: AuthorType,
      args: {
        authorId: { type: GraphQLID },
        userId: { type: GraphQLID }
      },
      resolve(parentValue, { authorId, userId }) {
        return Author.addFollower(authorId, userId)
      }
    },

    removeAutherFollower: {
      type: AuthorType,
      args: {
        authorId: { type: GraphQLID },
        userId: { type: GraphQLID }
      },
      resolve(parentValue, { authorId, userId }) {
        return Author.removeFollower(authorId, userId)
      }
    },

    createCharacter: {
      type: CharacterType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name, description }) {
        return new Character({ name, description }).save();
      }
    },

    deleteCharacter: {
      type: CharacterType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Character.deleteOne({ _id });
      }
    },

    updateCharacter: {
      type: CharacterType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, { id, name, description }) {
        const updateCharacterField = {};

        if (name) updateCharacterField.name = name;
        if (description) updateCharacterField.description = description;

        return Character.findOneAndUpdate(
          { _id, id },
          { $set: updateCharacterField },
          { new: true },
          (err, character) => {
            return character;
          }
        );
      }
    },

    addCharacterBook: {
      type: CharacterType,
      args: {
        characterId: { type: GraphQLID },
        bookId: { type: GraphQLID }
      },
      resolve(parentValue, { characterId, bookId }) {
        return Character.addBook(characterId, bookId)
      }
    },

    removeCharacterBook: {
      type: CharacterType,
      args: {
        characterId: { type: GraphQLID },
        bookId: { type: GraphQLID }
      },
      resolve(parentValue, { characterId, bookId }) {
        return Character.removeBook(characterId, bookId)
      }
    },

    createComment: {
      type: CommentType,
      args: {
        comment: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: GraphQLID },
        date: { type: new GraphQLNonNull(GraphQLDateTime) }
      },
      resolve(parentValue, { comment, date }) {
        return new Comment({ comment, date }).save();
      }
    },

    deleteComment: {
      type: CommentType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Comment.deleteOne({ _id });
      }
    },

    updateComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: { type: GraphQLID },
        date: { type: GraphQLDateTime }
      },
      resolve(parentValue, { id, comment, date }) {
        const updateCommentField = {};

        if (comment) updateCommentField.comment = comment;
        if (date) updateCommentField.date = date;

        return Comment.findOneAndUpdate(
          { _id: id },
          { $set: updateCommentField },
          { new: true },
          (err, comment) => {
            return comment;
          }
        );
      }
    },

    addCommentLike: {
      type: CommentType,
      args: {
        commentId: { type: GraphQLID },
        likeId: { type: GraphQLID }
      },
      resolve(parentValue, { commentId, likeId }) {
        return Comment.addLike(commentId, likeId)
      }
    },

    removeCommentLike: {
      type: CommentType,
      args: {
        commentId: { type: GraphQLID },
        likeId: { type: GraphQLID }
      },
      resolve(parentValue, { commentId, likeId }) {
        return Comment.removeLike(commentId, likeId)
      }
    },

    createLike: {
      type: LikeType,
      args: {
        user: { type: GraphQLID },
        book: { type: GraphQLID },
        comment: { type: GraphQLID },
        question: { type: GraphQLID },
        answer: { type: GraphQLID }
      },
      resolve(parentValue, { user, book, comment, question, answer }) {
        if (book) {
          return new Like({ user, book }).save();
        }
        if (comment) {
          return new Like({ user, comment }).save();
        }
        if (question) {
          return new Like({ user, question }).save();
        }
        if (answer) {
          return new Like({ user, answer }).save();
        }
      }
    },

    deleteLike: {
      type: BookType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Like.deleteOne({ _id });
      }
    },

    createQuestion: {
      type: QuestionType,
      args: {
        question: { type: new GraphQLNonNull(GraphQLString) },
        book: { type: GraphQLID },
        user: { type: GraphQLID },
        date: { type: new GraphQLNonNull(GraphQLDateTime) }
      },
      resolve(parentValue, { question, book, user, date }) {
        return new Question({ question, book, user, date }).save();
      }
    },

    deleteQuestion: {
      type: QuestionType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Question.deleteOne({ _id });
      }
    },

    updateQuestion: {
      type: QuestionType,
      args: {
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        date: { type: GraphQLDateTime }
      },
      resolve(parentValue, { id, question, date }) {
        const updateQuestionField = {};

        if (question) updateQuestionField.question = question;
        if (date) updateQuestionField.date = date;

        return Question.findOneAndUpdate(
          { _id: id },
          { $set: updateQuestionField },
          { new: true },
          (err, question) => {
            return question;
          }
        );
      }
    },

    addQuestionLike: {
      type: QuestionType,
      args: {
        questionId: { type: GraphQLID },
        likeId: { type: GraphQLID }
      },
      resolve(parentValue, { questionId, likeId }) {
        return Question.addLike(questionId, likeId)
      }
    },

    removeQuestionLike: {
      type: QuestionType,
      args: {
        questionId: { type: GraphQLID },
        likeId: { type: GraphQLID }
      },
      resolve(parentValue, { questionId, likeId }) {
        return Question.removeLike(questionId, likeId)
      }
    },

    createRating: {
      type: RatingType,
      args: {
        stars: { type: new GraphQLNonNull(GraphQLInt) },
        user: { type: GraphQLID },
        book: { type: GraphQLID }
      },
      resolve(parentValue, { stars, user, book }) {
        return new Rating({ stars, user, book }).save();
      }
    },

    deleteRating: {
      type: RatingType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Rating.deleteOne({ _id });
      }
    },

    updateRating: {
      type: RatingType,
      args: {
        id: { type: GraphQLID },
        stars: { type: GraphQLInt }
      },
      resolve(parentValue, { id, stars }) {
        const updateRatingField = {};
        updateRatingField.stars = stars;
        return Rating.findOneAndUpdate(
          { _id: id },
          { $set: updateRatingField },
          { new: true },
          (err, rating) => {
            return rating;
          }
        );
      }
    },

    createReview: {
      type: ReviewType,
      args: {
        user: { type: GraphQLID },
        book: { type: GraphQLID },
        content: { type: new GraphQLNonNull(GraphQLString) },
        hidden: { type: new GraphQLNonNull(GraphQLBoolean) },
        dateStarted: { type: new GraphQLNonNull(GraphQLDateTime) },
        dateFinished: { type: new GraphQLNonNull(GraphQLDateTime) },
        recommendTo: { type: new GraphQLNonNull(GraphQLString) },
        recommendBy: { type: GraphQLID },
        privateNotes: { type: new GraphQLNonNull(GraphQLString) },
        owned: { type: new GraphQLNonNull(GraphQLBoolean) },
        postToBlog: { type: new GraphQLNonNull(GraphQLBoolean) },
        addToFeed: { type: new GraphQLNonNull(GraphQLBoolean) },
        date: { type: new GraphQLNonNull(GraphQLDateTime) }
      },
      resolve(
        parentValue,
        {
          user,
          book,
          content,
          hidden,
          dateStarted,
          dateFinished,
          recommendTo,
          recommendBy,
          privateNotes,
          owned,
          postToBlog,
          addToFeed,
          date
        }
      ) {
        return new Review({
          user,
          book,
          content,
          hidden,
          dateStarted,
          dateFinished,
          recommendTo,
          recommendBy,
          privateNotes,
          owned,
          postToBlog,
          addToFeed,
          date
        }).save();
      }
    },

    deleteReview: {
      type: ReviewType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Review.deleteOne({ _id });
      }
    },

    updateReview: {
      type: ReviewType,
      args: {
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        hidden: { type: GraphQLBoolean },
        dateStarted: { type: GraphQLDateTime },
        dateFinished: { type: GraphQLDateTime },
        recommendTo: { type: GraphQLString },
        recommendBy: { type: GraphQLID },
        privateNotes: { type: GraphQLString },
        owned: { type: GraphQLBoolean },
        postToBlog: { type: GraphQLBoolean },
        addToFeed: { type: GraphQLBoolean },
        date: { type: GraphQLDateTime }
      },
      resolve(
        parentValue,
        {
          id,
          content,
          hidden,
          dateStarted,
          dateFinished,
          recommendTo,
          recommendBy,
          privateNotes,
          owned,
          postToBlog,
          addToFeed,
          date
        }
      ) {
        const updateReviewField = {};

        if (content) updateReviewField.content = content;
        if (hidden) updateReviewField.hidden = hidden;
        if (dateStarted) updateReviewField.dateStarted = dateStarted;
        if (dateFinished) updateReviewField.dateFinished = dateFinished;
        if (recommendTo) updateReviewField.recommendTo = recommendTo;
        if (recommendBy) updateReviewField.recommendBy = recommendBy;
        if (privateNotes) updateReviewField.privateNotes = privateNotes;
        if (owned) updateReviewField.owned = owned;
        if (postToBlog) updateReviewField.postToBlog = postToBlog;
        if (addToFeed) updateReviewField.addToFeed = addToFeed;
        if (date) updateReviewField.date = date;

        return Review.findOneAndUpdate(
          { _id: id },
          { $set: updateReviewField },
          { new: true },
          (err, review) => {
            return review;
          }
        );
      }
    },

    createSeries: {
      type: SeriesType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { title }) {
        return new Series({ title }).save();
      }
    },

    deleteSeries: {
      type: SeriesType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Series.deleteOne({ _id });
      }
    },

    updateSeries: {
      type: SeriesType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString }
      },
      resolve(parentValue, { id, title }) {
        const updateSeriesField = {};
        updateSeriesField.title = title;
        return Series.findOneAndUpdate(
          { _id: id },
          { $set: updateSeriesField },
          { new: true },
          (err, series) => {
            return series;
          }
        );
      }
    },

    addSeriesBook: {
      type: SeriesType,
      args: {
        seriesId: { type: GraphQLID },
        bookId: { type: GraphQLID }
      },
      resolve(parentValue, { seriesId, bookId }) {
        return Series.addBook(seriesId, bookId)
      }
    },

    removeSeriesBook: {
      type: SeriesType,
      args: {
        seriesId: { type: GraphQLID },
        bookId: { type: GraphQLID }
      },
      resolve(parentValue, { seriesId, bookId }) {
        return Series.removeBook(seriesId, bookId)
      }
    },

    createShelf: {
      type: ShelfType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: GraphQLID }
      },
      resolve(parentValue, { name, user }) {
        return new Shelf({ name, user }).save();
      }
    },

    deleteShelf: {
      type: ShelfType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return Shelf.deleteOne({ _id });
      }
    },

    updateShelf: {
      type: ShelfType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parentValue, { id, name }) {
        const updateShelfField = {};
        updateShelfField.name = name;
        return Shelf.findOneAndUpdate(
          { _id: id },
          { $set: updateShelfField },
          { new: true },
          (err, shelf) => {
            return shelf;
          }
        );
      }
    },

    addShelfBook: {
      type: ShelfType,
      args: {
        shelfId: { type: GraphQLID },
        bookId: { type: GraphQLID }
      },
      resolve(parentValue, { shelfId, bookId }) {
        return Shelf.addBook(shelfId, bookId)
      }
    },

    removeShelfBook: {
      type: ShelfType,
      args: {
        shelfId: { type: GraphQLID },
        bookId: { type: GraphQLID }
      },
      resolve(parentValue, { shelfId, bookId }) {
        return Shelf.removeBook(shelfId, bookId)
      }
    },
  }
});

module.exports = mutation;
