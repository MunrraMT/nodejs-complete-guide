const Product = require('../models/product');

exports.getAddProduct = (request, response, next) => {
  const data = {
    pageTitle: 'Add product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  };

  response.render('admin/add-product', data);
};

exports.postAddProduct = (request, response, next) => {
  const { title } = request.body;
  const product = new Product(title);

  product.save((message) => {
    console.log(message);
    response.redirect('/');
  });
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    const hasProducts = !!products && products.length > 0;
    const data = {
      pageTitle: 'Admin Products',
      products,
      hasProducts,
      activeAdminProduct: true,
      productCSS: true,
    };

    response.render('admin/list-product', data);
  });
};
