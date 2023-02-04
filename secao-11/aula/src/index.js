const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { adminRoutes } = require('./routes/admin');
const { shopRoutes } = require('./routes/shop');
const { errorRoute } = require('./routes/error');

const sequelize = require('./data/database');

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

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoute);

sequelize
  .sync()
  .then(() => app.listen(3000, () => console.log('Server ON!')))
  .catch((err) => console.log(err));
