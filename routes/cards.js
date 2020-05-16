const routerCard = require('express').Router();
const path = require('path');
const { celebrate, Joi } = require('celebrate');

const { createCard, getAllCards, deleteCard } = require(path.join(__dirname, '../controllers/cards'));

routerCard.get('/', getAllCards);
routerCard.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
routerCard.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), deleteCard);

module.exports = {
  routerCard,
};
