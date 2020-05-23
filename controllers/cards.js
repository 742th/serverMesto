const Card = require('../models/card');
const NotFoundError = require('../commons/NotFoundError');
const ForbiddenError = require('../commons/ForbiddenError');
const BadRequestError = require('../commons/BadRequestError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Не удалось создать карточку');
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Нет данных о карточках');
      }
      return res.send(cards);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет');
      }
      if (card.owner.toString() === req.user._id) {
        return Card.findByIdAndRemove(req.params._id)
          .then((el) => {
            if (!el) {
              throw new BadRequestError('Что-то пошло не так');
            }
            return res.send(el);
          })
          .catch(next);
      } throw new ForbiddenError('Нет прав на удаление');
    })
    .catch(next);
};
