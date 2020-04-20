const routerUsers = require('express').Router();
const path = require('path');
const { createUser, getAllUsers, getUser } = require(path.join(__dirname,'../controllers/users'));

routerUsers.get('/', getAllUsers);
routerUsers.get('/:_id', getUser);
routerUsers.post('/', createUser);

module.exports = {
  routerUsers,
};
