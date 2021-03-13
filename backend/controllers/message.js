const Message = require("../models/message");

// exports.createMessage = (req, res, next) => {
//   const message = new Message({
//     title: req.body.title,
//     content: req.body.content,
//     image: req.body.image,
//     likes: req.body.likes,
//     dislikes: req.body.dislikes,
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
// };

// exports.getOneMessage = (req, res, next) => {
//   Message.findOne({
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
// };

// exports.modifyMessage = (req, res, next) => {
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
// };

// exports.deleteMessage = (req, res, next) => {
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
// };

exports.getAllMessage = (req, res, next) => {
  models.Message.findAll({
    attributes: [
      "id",
      "UserId",
      "title",
      "content",
      "image",
      "likes",
      "dislikes",
      "createdAt",
      "updatedAt",
    ],
    order: [["updatedAt", "DESC"]], 
    include: [
      {
        model: models.User,
        attributes: ["name"],
      },
    //   {
    //     model: models.Comment,
    //     attributes: ["comment"],
    //   },
    ],
  })
    .then((message) => {
      if (message === null) {
        return res.status(404).json({ error: "Post don't find" });
      }
      res.status(200).json({ message });
    })
    .catch((error) => res.status(400).json({ error: error })); 
};
