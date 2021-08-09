const mongoose = require("mongoose");
const secretKey = process.env['uri'];

async function initializeDBConnection() {
  try {
    await mongoose.connect(secretKey, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("succesfully connected");
  } catch (error) {
    console.error("connection failed: ", error)
  }
};

module.exports = { initializeDBConnection };
