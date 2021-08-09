const express = require("express");
const postRouter = express.Router();
const { fetchPosts, addPost } = require("../controllers/post.controller")

postRouter.route("/")
  .get(fetchPosts)

  .post(addPost)

module.exports = postRouter;