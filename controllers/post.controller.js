const { Post } = require("../models/posts.model");
const { User } = require("../models/user.model");

const fetchPosts = async (req, res) => {
  try {
    const { userId } = req.user;
    const posts = await Post.find({}).populate("user");
    res.json({ success: true, posts, userId })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

const addPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId)
    const { content } = req.body;
    const newPost = new Post({
      user,
      content
    })
    await newPost.save();
    res.json({ success: true, post: newPost })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

const getPostById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "post not found" })
    }

    req.post = post;
    next();
  } catch (error) {
    res.status(404).json({ success: false, message: "something went wrong", errorMessage: error.message })
  }
}

const fetchPost = async (req, res) => {
  try {
    const post = req.post;
    res.json({ success: true, post })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

const deletePost = async (req, res) => {
  try {
    const post = req.post;
    const { userId } = req.user;

    if (post.user.toString() === userId) {

      await Post.findByIdAndDelete(post._id)

      return res.json({ success: true, deletedPost: post, message: "successfully deleted" })
    } res.json({ success: false, message: "unauthorized" })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

const likePost = async (req, res) => {
  try {
    const { userId } = req.user;
    const post = req.post;

    const isPostLiked = post.likes.find(id => id.toString() === userId);

    isPostLiked ? post.likes.pull(userId) : post.likes.push(userId);

    await post.save()

    res.json({ success: true, post, userId })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

const commentOnPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { comment } = req.body;
    const post = req.post;

    console.log({ post })

    post.comment.push({ user: userId, text: comment })
    await post.save();
    res.json({ success: true, post })

  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

const deleteComment = async (req, res) => {
  try {
    const { userId } = req.user;
    const { commentId } = req.params;

    const post = req.post

    const commentToBeDeleted = post.comment.find(({_id}) => _id.toString() === commentId);

    post.comment.pull(commentToBeDeleted)
    await post.save();

    res.json({ success: true, commentToBeDeleted, message: "comment deleted!", post: post._id  })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

module.exports = { fetchPosts, addPost, getPostById, fetchPost, deletePost, likePost, commentOnPost, deleteComment };