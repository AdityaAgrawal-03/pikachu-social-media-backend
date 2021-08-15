const express = require("express");
const userRouter = express.Router();
const { getUser, getLikingUsers, updateFollowingAndFollowers, getAllUsers, getFollowing, getFollowers } = require("../controllers/user.controller");

userRouter.route("/")
  .get(getAllUsers);

userRouter.route("/:username")
  .get(getUser);

userRouter.route("/:username/followers")
  .get(getFollowers);

userRouter.route("/:username/following")
  .get(getFollowing)

userRouter.route("/:postId/liking_users")
  .get(getLikingUsers)

userRouter.route("/:username/:target_userId")
  .post(updateFollowingAndFollowers)


module.exports = userRouter;