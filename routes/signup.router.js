const express = require("express");
const signupRouter = express.Router();
const { signupUser } = require("../controllers/signup.controller");

signupRouter.route("/")
  .post(signupUser);

module.exports = signupRouter;