const mongoose = require("mongoose");
const { Schema } = mongoose; 

const UserSchema = new Schema({
  name: {
    type: String,
    required: "Cannot add user without name"
  },
  username: {
    type: String,
    required: "Cannot add user without username"
  },
  email: {
    type: String,
    required: "Cannot add user without email"
  },
  password: {
    type: String,
    required: "Cannot add user without password"
  }
}, {
  timestamp: true
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };