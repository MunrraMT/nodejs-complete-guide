/* eslint-disable */

const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use('/', (request, response) => {
  response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000, () => {
  console.log('Server init - http://localhost:3000/');
});
