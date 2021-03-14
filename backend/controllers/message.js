const models = require("../models");

exports.createMessage = (req, res, next) => {
  const title = req.body.title;
  const comment = req.body.comment;

  if (title.length < 2 || comment.length < 2) {
    return res.status(400).json({ error: "Merci de remplir tous les champs." });
  }

  models.Message.create({
    UserId: userId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    like: 0,
    like: 0,
  })
    .then((message) =>
      res.status(201).json({ message: "Post save successfully ! " })
    )
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneMessage = (req, res, next) => {
  models.Message.findOne({
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
    where: { id: req.params.id },
    include: [
      {
        model: models.User,
        attributes: ["name"],
      },
    ],
  })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyMessage = (req, res, next) => {
  const message = new Message({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
  });
  Message.updateOne({ _id: req.params.id }, message)
    .then(() => {
      res.status(201).json({
        message: "Message updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteMessage = (req, res, next) => {
  Message.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

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
