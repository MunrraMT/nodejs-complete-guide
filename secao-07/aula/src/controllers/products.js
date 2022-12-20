const Product = require('../models/product');

exports.getAddProduct = (request, response, next) => {
  const data = {
    pageTitle: 'Add product',
    path: '/admin/add-product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  };

  response.render('add-product', data);
};

exports.postAddProduct = (request, response, next) => {
  const { title } = request.body;
  const product = new Product(title);

  product.save();
  response.redirect('/');
};

exports.getProducts = (request, response, next) => {
  const productsCurrent = Product.fetchAll();
  const data = {
    products: productsCurrent,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: productsCurrent.length > 0,
    activeShop: true,
    productCSS: true,
  };

  response.render('shop', data);
};
