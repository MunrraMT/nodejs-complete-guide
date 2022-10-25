/* eslint-disable */

const app = require('express')();

app.use((request, response, next) => {
  console.log('Middleware 1');
  next();
});

app.use((request, response, next) => {
  console.log('Middleware 2');
  response.send('<h1>Testando!</h1>');
});

app.listen(3000, () => {
  console.log('Server init - http://localhost:3000/');
});
