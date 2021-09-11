const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  text: {
    type: String,
    required: "Cannot add blank comment"
  }
}, {
  timestamps: true
})

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type: String,
    required: "Cannot add post without content" 
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  comment: [CommentSchema]
}, {
    timestamps: true
  });

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post }
