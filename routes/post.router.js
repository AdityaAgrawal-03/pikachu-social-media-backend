const express = require("express");
const postRouter = express.Router();
const { fetchPosts, addPost, getPostById, likePost, commentOnPost, fetchPost, deletePost, deleteComment } = require("../controllers/post.controller")

postRouter.route("/")
  .get(fetchPosts)
  .post(addPost)

postRouter.param("postId", getPostById);

// get or delete a single post
postRouter.route("/:postId")
  .get(fetchPost)
  .delete(deletePost)

// like or unlike post
postRouter.route("/like/:postId")
  .post(likePost)

// add or delete comment
postRouter.route("/comment/:postId")
  .post(commentOnPost)

postRouter.route("/comment/:postId/:commentId")
  .delete(deleteComment)
  

module.exports = postRouter;