const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');
const { routerCard } = require('./routes/cards.js');
const { routerUsers } = require('./routes/users.js');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', routerCard);
app.use('/', routerUsers);


app.listen(PORT, () => {
  console.log(`listen ${PORT}`);
});
