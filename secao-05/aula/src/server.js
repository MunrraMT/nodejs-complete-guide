const http = require('http');
const routes = require('./routes');
const express = require('express');

const app = express();

// app.listen(3000, () => {
//   console.log('Server init - http://localhost:3000/');
// })

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server init - http://localhost:3000/');
});
