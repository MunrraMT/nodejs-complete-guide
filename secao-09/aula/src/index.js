const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

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

const { adminRoutes } = require('./routes/admin');
const { errorRoute } = require('./routes/error');
const { shopRoutes } = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoute);

app.listen(3000, () => console.log('Server ON!'));
