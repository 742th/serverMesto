const routerCard = require('express').Router();
const path = require('path');
const { createCard, getAllCards, deleteCard } = require(path.join(__dirname, '../controllers/cards'));

routerCard.get('/', getAllCards);
routerCard.post('/', createCard);
routerCard.delete('/:cardId', deleteCard);

module.exports = {
  routerCard,
};
