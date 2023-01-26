const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const db = require('./data/database');
const { adminRoutes } = require('./routes/admin');
const { shopRoutes } = require('./routes/shop');
const { errorRoute } = require('./routes/error');

const app = express();

app.engine(
  'hbs',
  expressHbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout-main',
    layoutsDir: 'src/views/layouts',
    partialsDir: 'src/views/partials',
  }),
);

app.set('view engine', 'hbs');
app.set('views', 'src/views/pages');

db.execute('SELECT * FROM products')
  .then((result) => {
    console.log(result[0]);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoute);

app.listen(3000, () => console.log('Server ON!'));
