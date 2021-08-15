const bodyParser = require("body-parser");
const cors = require("cors");
const express = require('express');
const app = express();
const { initializeDBConnection } = require("./db/db.connect");
const posts = require("./routes/post.router");
const signup = require("./routes/signup.router");
const login = require("./routes/login.router");
const users = require("./routes/user.router");
const { authVerify } = require("./middlewares/authVerify")

app.use(bodyParser.json());
app.use(cors());

initializeDBConnection();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.use("/signup", signup);
app.use("/login", login);
app.use(authVerify);
app.use("/posts", posts);
app.use("/users", users)

app.listen(3000, () => {
  console.log('server started');
});