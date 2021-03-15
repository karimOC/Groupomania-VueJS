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

exports.likeDislikeMessage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  models.Message.findOne({
    attributes: [
      "id",
      "idUsers",
    ],
    where: { id: req.params.id, idUsers: userId },
  });

  const like = req.body.like;
  if (like === 1) {
    models.Message.updateOne(
      { where: { id: req.params.id } },
      {
        $push: { usersLiked: userId },
        $inc: { likes: +1 },
      }
    )
      .then(() => res.status(200).json({ message: "Like ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
  }

  // if (like === -1) {
  //   models.Message.updateOne(
  //     { where: { id: req.params.id } },
  //     {
  //       $push: { usersDisliked: userId },
  //       $inc: { dislikes: -1 },
  //     }
  //   )
  //     .then(() => {
  //       res.status(200).json({ message: "Dislike ajouté !" });
  //     })
  //     .catch((error) => res.status(400).json({ error }));
  // }

  // if (like === 0) {
  //   models.Message.findOne({
  //     where: { id: req.params.id, idUsers: userId },
  //   })
  //     .then((message) => {
  //       if (message.usersLiked.includes(userId)) {
  //         models.Message.updateOne(
  //           { id: id },
  //           {
  //             $pull: { usersLiked: userId },
  //             $inc: { likes: -1 },
  //           }
  //         )
  //           .then(() => res.status(200).json({ message: "Like retiré !" }))
  //           .catch((error) => res.status(400).json({ error }));
  //       }
  //       if (message.usersDisliked.includes(userId)) {
  //         models.Message.updateOne(
  //           { id: id },
  //           {
  //             $pull: { usersDisliked: userId },
  //             $inc: { dislikes: -1 },
  //           }
  //         )
  //           .then(() => res.status(200).json({ message: "Dislike retiré !" }))
  //           .catch((error) => res.status(400).json({ error }));
  //       }
  //     })
  //     .catch((error) => res.status(404).json({ error }));
  // }
};
