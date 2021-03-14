const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message");
const auth = require("../middleware/auth");

router.get("/", auth, messageCtrl.getAllMessage);
router.get("/:id", auth, messageCtrl.getOneMessage);
router.post("/", auth, messageCtrl.createMessage);
// router.put("/:id", auth, messageCtrl.modifyMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);

module.exports = router;
