const routerUsers = require('express').Router();
const path = require('path');

const { getAllUsers, getUser } = require(path.join(__dirname, '../controllers/users'));

routerUsers.get('/', getAllUsers);
routerUsers.get('/:_id', getUser);


module.exports = {
  routerUsers,
};
