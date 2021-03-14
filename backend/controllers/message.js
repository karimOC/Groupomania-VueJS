const models = require("../models");
const jwt = require("jsonwebtoken");

exports.createMessage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  const title = req.body.title;
  const content = req.body.content;

  if (title.length < 2 || content.length < 2) {
    return res.status(400).json({ error: "Merci de remplir tous les champs." });
  }

  models.Message.create({
    idUsers: userId,
    title: title,
    content: content,
    image: req.body.image,
    likes: 0,
    dislikes: 0,
  })
    .then(() => res.status(201).json({ message: "Message enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllMessage = (req, res, next) => {
  models.Message.findAll({
    attributes: [
      "id",
      "idUsers",
      "title",
      "content",
      "image",
      "likes",
      "dislikes",
      "createdAt",
      "updatedAt",
    ],
  })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneMessage = (req, res, next) => {
  models.Message.findOne({
    attributes: [
      "id",
      "idUsers",
      "title",
      "content",
      "image",
      "likes",
      "dislikes",
      "createdAt",
      "updatedAt",
    ],
    where: { id: req.params.id },
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

exports.deleteMessage = (req, res, next) => {
  models.Message.findOne({
    where: { id: req.params.id },
  })
    .then(() => {
      models.Message.destroy({ where: { id: req.params.id } });
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
