const routerCard = require('express').Router();

const cards = require('../data/cards.json');

routerCard.get('/', (req, res) => {
  res.status(200).json(cards);
});

module.exports = {
  routerCard,
};
