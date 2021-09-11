const jwt = require("jsonwebtoken");
const brcypt = require("bcrypt");
const secret = process.env['secret'];
const { User } = require("../models/user.model");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const validatePassword = await brcypt.compare(password, user.password);
      if (validatePassword) {

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "24h" });
        
        return res.status(200).json({ success: true, message: "user successfully logged in", user, token })
      } return res.status(400).json({ success: false, message: "Invalid password" })
    }
    return res.status(401).json({ success: false, message: "Unauthorized access, user does not exist!" })
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
}

module.exports = { loginUser };