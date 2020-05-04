const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      throw err.message;
    });
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      throw err.message;
    });
};

module.exports.deleteCard = (req, res) => {
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
    .catch((err) => {
      res.status(404).send({ message: err.message });
    });
};
