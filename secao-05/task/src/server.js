const app = require('express')();

app.use((request, response, next) => {
  console.log('First middleware!');
  next();
});

app.use('/users', (request, response) => {
  console.log('Users middleware!');
  response.send('Users Page');
});

app.use('/', (request, response) => {
  console.log('Home middleware!');
  response.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server start!');
});
