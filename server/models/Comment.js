const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
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

CommentSchema.statics.addLike = (commentId, likeId) => {
  const Comment = mongoose.model("comments");
  const Like = mongoose.model("likes");

  return Comment.findById(commentId).then(comment => {
    return Like.findById(likeId).then(like => {
      comment.likes.push(like);
      like.comments = commentId;

      return Promise.all([comment.save(), like.save()]).then(
        ([comment, like]) => comment
      );
    });
  });
};

CommentSchema.statics.removeLike = (commentId, likeId) => {
  const Comment = mongoose.model("comments");
  const Like = mongoose.model("likes");

  return Comment.findById(commentId).then(comment => {
    return Like.findById(likeId).then(like => {
      comment.likes.pull(like);
      Like.findByIdAndRemove(likeId)

      return Promise.all([comment.save(), like.save()]).then(
        ([comment, like]) => comment
      );
    });
  });
};

module.exports = mongoose.model("comments", CommentSchema);
