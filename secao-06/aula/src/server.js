/* eslint-disable */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const { engine: hbsEngine } = require('express-handlebars'); // handlebars

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

// EJS
app.set('view engine', 'ejs');

// handlebars
// app.engine(
//   'hbs',
//   hbsEngine({
//     extname: '.hbs',
//     layoutsDir: 'src/views/layouts/',
//     defaultLayout: 'main-layout',
//   }),
// );
// app.set('view engine', 'hbs');

// Pug
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
