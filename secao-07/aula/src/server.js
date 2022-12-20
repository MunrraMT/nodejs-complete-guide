const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', errorsController.getPageNotFound);

app.listen(3000, () => {
  console.log('Server listen!');
});
