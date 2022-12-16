const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/routes');

const app = express();

app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    defaultLayout: 'layout-main',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
  }),
);

app.set('view engine', 'hbs');
app.set('views', 'src/views/pages');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(router);
app.use('/', (request, response) => {
  const data = {
    pageTitle: '404',
  };

  response.status(404).render('404', data);
});

app.listen(3000, () => {
  console.log('Servidor ligado!');
});
