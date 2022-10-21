/* eslint-disable */

const http = require('http');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use((request, response, next) => {
  console.log('Middleware 1');
  next();
});

app.use((request, response, next) => {
  console.log('Middleware 2');
});

// app.listen(3000, () => {
//   console.log('Server init - http://localhost:3000/');
// });

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server init - http://localhost:3000/');
});
