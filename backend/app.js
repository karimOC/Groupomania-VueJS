const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const messageRoutes = require("./routes/message");
const userRoutes = require('./routes/user');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.use(bodyParser.json());

app.use("/api/messages", messageRoutes);
app.use('/api/auth', userRoutes);
module.exports = router;
