const NotFoundError = require('../commons/NotFoundError');

const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      throw err.message;
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      throw err.message;
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => new NotFoundError('Нет пользователя с таким id'))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.statusCode).send({ message: err.message }));
};
