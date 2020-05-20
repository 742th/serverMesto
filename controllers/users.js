const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../commons/NotFoundError');
const BadRequestError = require('../commons/BadRequestError');
const UnauthorizedError = require('../commons/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      if (!hash) {
        throw new BadRequestError('Не удалось создать пользователя');
      }
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Не удалось создать пользователя');
      }
      User.findOne({ _id: user._id });
    })
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Не удалось создать пользователя');
      }
      return res.send({ name, about, email });
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .orFail(() => new NotFoundError('Нет пользователей'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(() => new NotFoundError('Нет пользователя с таким id'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные имя или пароль');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};
