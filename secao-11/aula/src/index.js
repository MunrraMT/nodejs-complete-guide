const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { adminRoutes } = require('./routes/admin');
const { shopRoutes } = require('./routes/shop');
const { errorRoute } = require('./routes/error');

const sequelize = require('./data/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

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

app.use((request, response, next) => {
  User.findByPk('admin')
    .then((user) => {
      request.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoute);

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk('admin');
  })
  .then((user) => {
    if (!user) {
      return User.create({
        id: 'admin',
        name: 'André',
        email: 'test@test.com',
      });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then(() => {
    app.listen(3000, () => console.log('Server ON!'));
  })
  .catch((err) => console.log(err));
