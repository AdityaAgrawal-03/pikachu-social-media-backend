const { Post } = require("../models/posts.model");

const fetchPosts = async (req, res) => {
  try {
    const { userId } = req.user;
    const posts = await Post.find({user: userId}).populate("user");
    res.json({ success: true, posts })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

const addPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { content } = req.body;
    const newPost = new Post({
      user: userId,
      content
    })
    await newPost.save();
    res.json({ success: true, post: newPost })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

module.exports = { fetchPosts, addPost };