const { User } = require("../models/user.model");
const { Post } = require("../models/posts.model");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.json({ success: true, users })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

//  user lookup
const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username })

    res.json({ success: true, user })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
};

// users who have liked a post
const getLikingUsers = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("likes");

    const likingUsers = post.likes.map(({ _id, name, username }) => {
      return { _id: _id, name: name, username: username }
    })

    res.json({ success: true, likingUsers })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

// allow a user to follow/unfollow another user
const updateFollowingAndFollowers = async (req, res) => {
  try {
    const { username, target_userId } = req.params;

    const sourceUser = await User.findOne({ username: username });
    const targetUser = await User.findById(target_userId);
    console.log({ targetUser });
    console.log({ sourceUser })
    const isInFollowing = sourceUser.following.find(userId => userId.toString() === target_userId);

    if (isInFollowing) {
      sourceUser.following.pull(target_userId);
      targetUser.followers.pull(sourceUser._id)
    } else {
      sourceUser.following.push(target_userId);
      targetUser.followers.push(sourceUser._id);
    }

    await sourceUser.save();
    await targetUser.save();

    res.json({ success: true, sourceUser, targetUser })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

//list of following
const getFollowing = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username: username }).populate("following");

    const userFollowing = user.following.map(({ _id, name, username }) => {
      return { _id: _id, name: name, username: username }
    })

    res.json({ success: true, userId: user._id, userFollowing })
  } catch (error) {
    console.log("here")
    res.json({ success: false, errorMessage: error.message, error: "Error" })
  }
}

// list of followers
const getFollowers = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username }).populate("followers");

    const userFollowers = user.followers.map(({ _id, name, username }) => {
      return { _id: _id, name: name, username: username }
    })    

     res.json({ success: true, userId: user._id, userFollowers })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message, error: "Error" })
  }
}

module.exports = { getAllUsers, getUser, getLikingUsers, updateFollowingAndFollowers, getFollowing, getFollowers };