const secret = process.env['secret'];
const jwt = require("jsonwebtoken");

const authVerify = (req, res, next) => {
  const token  = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
   
    req.user = { userId: decoded.userId };
    return next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Unauthorized access, please provide token", errorMessage: error.message })
  }
};

module.exports = { authVerify };