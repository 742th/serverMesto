const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');
const { routerCard } = require('./routes/cards.js');
const { routerUsers } = require('./routes/users.js');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/cards', routerCard);
app.use('/users', routerUsers);
app.use('/', (req, res) => {
  res.status(404).json({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`listen ${PORT}`);
});
