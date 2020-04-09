const routerUsers = require('express').Router();
const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const users = require(path.join(__dirname, '../data/user.json'));


routerUsers.get('/', (req, res) => {
  res.json(users);
});

const doesUserExist = (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const answer = users.find((el) => el._id === req.params._id);
  if (answer) {
    res.json(answer);
  } res.status(404).json({ message: 'Нет пользователя с таким id' });

  next();
};

routerUsers.get('/:_id', doesUserExist);

module.exports = {
  routerUsers,
};
