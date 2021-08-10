const express = require("express");
const userRouter = express.Router();
const { getUser, getLikingUsers, updateFollowingAndFollowers, fetchFollowing } = require("../controllers/user.controller");

userRouter.route("/:username")
  .get(getUser);

userRouter.route("/:postId/liking_users")
  .get(getLikingUsers)

userRouter.route("/:username/:target_userId")
  .post(updateFollowingAndFollowers)


module.exports = userRouter;