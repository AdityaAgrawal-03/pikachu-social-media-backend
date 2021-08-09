const express = require("express");
const signupRouter = express.Router();
const jwt = require("jsonwebtoken");
const brcypt = require("bcrypt");
const { User } = require("../models/user.model");
const { Post } = require("../models/posts.model")
const secret = process.env['secret'];

signupRouter.route("/")
  .post(async (req, res) => {
    try {
      let { name, username, email, password } = req.body;
      const salt = await brcypt.genSalt(10);
      password = await brcypt.hash(password, salt);

      const user = new User({ name, username, email, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "24h" });

      res.json({ success: true, user, token, message: "User successfully added" })

    } catch (error) {
      res.json({ success: false, errorMessage: errorMessage })
    }


  })

module.exports = signupRouter;