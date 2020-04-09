const routerCard = require('express').Router();
const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const cards = require(path.join(__dirname, '../data/cards.json'));

routerCard.get('/', (req, res) => {
  res.json(cards);
});

module.exports = {
  routerCard,
};
