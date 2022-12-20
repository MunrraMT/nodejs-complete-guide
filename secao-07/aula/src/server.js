const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

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

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', (request, response) => {
  const data = {
    pageTitle: 'Page not found',
  };
  response.status(404).render('404', data);
});

app.listen(3000, () => {
  console.log('Server listen!');
});
