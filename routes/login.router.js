const express = require("express");
const loginRouter = express.Router();
const { loginUser } = require("../controllers/login.controller");

loginRouter.route("/")
  .post(loginUser);

module.exports = loginRouter;