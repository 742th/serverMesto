const routerCard = require('express').Router();
const path = require('path');
const { celebrate, Joi } = require('celebrate');

const { createCard, getAllCards, deleteCard } = require(path.join(__dirname, '../controllers/cards'));

routerCard.get('/', getAllCards);
routerCard.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/https?:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{2,5})?((\/[a-zA-Z0-9/]+)?)|(www\.)?\w+\.?\w*\.?\w*(\.[a-z]+|(:\d{2,5}))(\/?|\/[a-zA-Z0-9/]+))#?\/?/),
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
