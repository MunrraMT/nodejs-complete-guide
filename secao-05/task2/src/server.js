const path = require('path');
const express = require('express');

const homeRoute = require('./routes/home');
const UsersRoute = require('./routes/users');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(homeRoute);
app.use(UsersRoute);

app.listen(3000, () => {
  console.log('server init');
});
