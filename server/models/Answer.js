const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "books"
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "likes"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

AnswerSchema.statics.addLike = (answerId, likeId) => {
  const Answer = mongoose.model("answers");
  const Like = mongoose.model("likes");

  return Answer.findById(answerId).then(answer => {
    return Like.findById(likeId).then(like => {
      answer.likes.push(like);
      like.answers = answerId;

      return Promise.all([answer.save(), like.save()]).then(
        ([answer, like]) => answer
      );
    });
  });
};

AnswerSchema.statics.removeLike = (answerId, likeId) => {
  const Answer = mongoose.model("answers");
  const Like = mongoose.model("likes");

  return Answer.findById(answerId).then(answer => {
    return Like.findById(likeId).then(like => {
      answer.likes.pull(like);
      Like.findByIdAndRemove(likeId)

      return Promise.all([answer.save(), like.save()]).then(
        ([answer, like]) => answer
      );
    });
  });
};

AnswerSchema.statics.addComment = (answerId, commentId) => {
  const Answer = mongoose.model("answers");
  const Comment = mongoose.model("comments");

  return Answer.findById(answerId).then(answer => {
    return Comment.findById(commentId).then(comment => {
      answer.comments.push(comment);

      return Promise.all([answer.save(), comment.save()]).then(
        ([answer, comment]) => answer
      );
    });
  });
};

AnswerSchema.statics.removeComment = (answerId, commentId) => {
  const Answer = mongoose.model("answers");
  const Comment = mongoose.model("comments");

  return Answer.findById(answerId).then(answer => {
    return Comment.findById(commentId).then(comment => {
      answer.comments.pull(comment);
      Comment.findByIdAndRemove(commentId)

      return Promise.all([answer.save(), comment.save()]).then(
        ([answer, comment]) => answer
      );
    });
  });
};

module.exports = mongoose.model("answers", AnswerSchema);
