const routerCard = require('express').Router();
const path = require('path');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { createCard, getAllCards, deleteCard } = require(path.join(__dirname, '../controllers/cards'));

routerCard.get('/', getAllCards);
routerCard.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validator.isURL),
  }),
}), createCard);
routerCard.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().required(),
  }),
}), deleteCard);

module.exports = {
  routerCard,
};
