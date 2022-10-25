/* eslint-disable */

const app = require('express')();

app.use('/', (request, response, next) => {
  console.log('always!');
  next();
});

app.use('/add-product', (request, response, next) => {
  console.log('Middleware 2');
  response.send('<h1>add-product!</h1>');
});

app.use('/', (request, response, next) => {
  console.log('Middleware 3');
  response.send('<h1>Testando!</h1>');
});

app.listen(3000, () => {
  console.log('Server init - http://localhost:3000/');
});
