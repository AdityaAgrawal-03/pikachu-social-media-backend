const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: "Cannot add user without name"
  },
  username: {
    type: String,
    required: "Cannot add user without username",
    unique: true
  },
  email: {
    type: String,
    required: "Cannot add user without email",
  },
  password: {
    type: String,
    required: "Cannot add user without password"
  },
  bio: {
    type: String,
    max: [160, "Bio shouldn't exceed 160 characters"]
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
}, {
    timestamp: true
  });

const User = mongoose.model("User", UserSchema);

module.exports = { User };