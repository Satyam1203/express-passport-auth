const User = require("../models/users");

module.exports = {
  findOne: function (req, res) {
    User.find()
      .then((Users) => res.json(Users))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    User.create({
      image: req.body.data.image,
      name: req.body.data.name,
      price: parseInt(req.body.data.price),
      quantity: parseInt(req.body.data.quantity),
    })
      .then((addedUser) => res.json(addedUser))
      .catch((err) => res.status(422).json(err));
  },
};
