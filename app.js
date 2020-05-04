const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');

const { routerCard } = require(path.join(__dirname, './routes/cards.js'));
const { routerUsers } = require(path.join(__dirname, './routes/users.js'));
const auth = require(path.join(__dirname, './middlewares/auth'));
const { login, createUser } = require(path.join(__dirname, './controllers/users'));

// подключаемся к серверу монгус
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signup', createUser);
app.post('/signin', login);
// аутентификация пользователя
app.use(auth);
// роутер для отдачи карточек
app.use('/cards', routerCard);
// роутер для отдачи юзеров и юзера
app.use('/users', routerUsers);
app.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

// запустили нод сервак на 3000 порту
app.listen(PORT, () => {
});
