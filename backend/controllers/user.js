const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");

const TOKEN = "dsgsDrsg24zetzXE5656ztzetzyVFAE";

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = models.User.create({
        email: req.body.email,
        name: req.body.name,
        firstname: req.body.firstname,
        password: hash,
        isAdmin: false,
      })
        .then((user) => {
          console.log(JSON.parse(user.id));
          res.status(201).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign({ userId: user.id }, TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user._id },
              "dsgsDrsg24zetzXE5656ztzetzyVFAE",
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
