/* eslint-disable */

const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add-product', (request, response, next) => {
  response.send(
    '<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Add product</button></form>',
  );
});

app.post('/product', (request, response) => {
  const { title } = request.body;
  console.log(title);
  response.redirect('/');
});

app.get('/', (request, response, next) => {
  response.send('<h1>Testando!</h1>');
});

app.listen(3000, () => {
  console.log('Server init - http://localhost:3000/');
});
