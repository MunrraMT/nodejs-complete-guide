/* eslint-disable */

const app = require('express')();
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use('/', (request, response) => {
  response.status(404).send('<h1>404</h1>');
});

app.listen(3000, () => {
  console.log('Server init - http://localhost:3000/');
});
