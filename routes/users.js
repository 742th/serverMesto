const routerUsers = require('express').Router();

const users = require('../data/user.json');


routerUsers.get('/users', (req, res) => {
  res.status(200).json(users);
});

const doesUserExist = (req, res, next) => {

let answer = users.find((el) => el._id === req.params._id);
  if (answer) {
    res.json(answer);
} res.status(404).send(`${req.params._id} не существует`);

  // next();
};

routerUsers.get('/users/:_id', doesUserExist);

module.exports = {
  routerUsers,
  doesUserExist,

};
