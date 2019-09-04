const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "books"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "likes"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

QuestionSchema.statics.addLike = (questionId, likeId) => {
  const Question = mongoose.model("questions");
  const Like = mongoose.model("likes");

  return Question.findById(questionId).then(question => {
    return Like.findById(likeId).then(like => {
      question.likes.push(like);
      like.questions = questionId;

      return Promise.all([question.save(), like.save()]).then(
        ([question, like]) => question
      );
    });
  });
};

QuestionSchema.statics.removeLike = (questionId, likeId) => {
  const Question = mongoose.model("questions");
  const Like = mongoose.model("likes");

  return Question.findById(questionId).then(question => {
    return Like.findById(likeId).then(like => {
      question.likes.pull(like);
      Like.findByIdAndRemove(likeId)

      return Promise.all([question.save(), like.save()]).then(
        ([question, like]) => question
      );
    });
  });
};

module.exports = mongoose.model("questions", QuestionSchema);
