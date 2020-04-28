const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');

const { routerCard } = require(path.join(__dirname, './routes/cards.js'));
const { routerUsers } = require(path.join(__dirname, './routes/users.js'));

// подключаемся к серверу монгус
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5e9c802a9394332e54901a13',
  };

  next();
});

// роутер для отдачи карточек
app.use('/cards', routerCard);
// роутер для отдачи юзеров и юзера
app.use('/users', routerUsers);
app.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

// запустили нод сервак на 3000 порту
app.listen(PORT, () => {
});
