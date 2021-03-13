const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const messageRoutes = require("./routes/Message");

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

app.use("/api/message", messageRoutes);

module.exports = router;
