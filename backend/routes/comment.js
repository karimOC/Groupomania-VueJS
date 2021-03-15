const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.get("/:id/comments", auth, commentCtrl.getAllComment);
router.post("/:id/comment/", auth, commentCtrl.createComment);
// router.put("/comment/:id", auth, commentCtrl.modifyComment);
router.delete("/:idMessages/comment/:id", auth, commentCtrl.deleteComment);
// router.post("/:id/likes", auth, commentCtrl.likeDislikeMessage);

module.exports = router;
