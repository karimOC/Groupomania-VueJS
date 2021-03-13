const express = require("express");
const router = express.Router();

const messageCtrl = require("../controllers/message");

router.get("/", messageCtrl.getAllMessage);
// router.post("/", messageCtrl.createMessage);
// router.get("/:id", messageCtrl.getOneMessage);
// router.put("/:id", messageCtrl.modifyMessage);
// router.delete("/:id", messageCtrl.deleteMessage);

module.exports = router;