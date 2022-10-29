/* eslint-disable */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', 'hbs');

// app.set('view engine', 'pug');

app.set('views', 'src/views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminData.routes);
app.use(shopRouter);

app.use('/', (request, response) => {
  response.status(404).render('404', { docTitle: '404' });
});

app.listen(3000, () => {
  console.log('Server init - http://localhost:3000/');
});
