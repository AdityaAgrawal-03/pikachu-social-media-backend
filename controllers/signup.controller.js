const jwt = require("jsonwebtoken");
const brcypt = require("bcrypt");
const { User } = require("../models/user.model");
const secret = process.env['secret'];

const signupUser = async (req, res) => {
  try {
    let { name, username, email, password } = req.body;
    const salt = await brcypt.genSalt(10);
    password = await brcypt.hash(password, salt);

    const doesUserExist = await User.findOne({ username });

    if (doesUserExist) {
      return res.status(409).json({ success: false, message: "user already exists!" });
    } else {
      const user = new User({ name, username, email, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "24h" });

      return res.json({ success: true, user, token, message: "User successfully added" })
    }

  } catch (error) {
    res.json({ success: false, errorMessage: errorMessage })
  }
};

// if user signs up, guide him to add his bio by going to his profile section

module.exports = { signupUser };