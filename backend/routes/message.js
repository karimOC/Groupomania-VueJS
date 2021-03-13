const express = require("express");
const router = express.Router();
const Message = require("../models");

// router.post("/", (req, res, next) => {
//   const message = new Message({
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId,
//   });
//   message
//     .save()
//     .then(() => {
//       res.status(201).json({
//         message: "Post saved successfully!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// });

// router.get("/:id", (req, res, next) => {
//     Message.findOne({
//     _id: req.params.id,
//   })
//     .then((message) => {
//       res.status(200).json(message);
//     })
//     .catch((error) => {
//       res.status(404).json({
//         error: error,
//       });
//     });
// });

// router.put("/:id", (req, res, next) => {
//   const message = new Message({
//     _id: req.params.id,
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId,
//   });
//   Message.updateOne({ _id: req.params.id }, message)
//     .then(() => {
//       res.status(201).json({
//         message: "Message updated successfully!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// });

// router.delete("/:id", (req, res, next) => {
//   Message.deleteOne({ _id: req.params.id })
//     .then(() => {
//       res.status(200).json({
//         message: "Deleted!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// });

router.get("/" + "", (req, res, next) => {
  Message.find()
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

module.exports = router;