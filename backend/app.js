const express = require("express");
const router = express.Router();
const messageRoutes = require("./routes/message");

app.use("/api/message", messageRoutes);

module.exports = router;
