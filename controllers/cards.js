const Card = require('../models/card');
const NotFoundError = require('../commons/NotFoundError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Не удалось создать карточку');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Нет данных о карточках');
      }
      res.send(cards);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return Card.findByIdAndRemove(req.params.cardId)
          .then((el) => res.send(el))
          .catch((err) => {
            res.status(404).send({ message: err.message });
          });
      } throw new Error('Нет прав на удаление');
    })
    .catch(next);
};
