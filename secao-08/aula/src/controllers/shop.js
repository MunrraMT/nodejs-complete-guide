const Product = require('../models/product');

exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    const hasProducts = !!products && products.length > 0;
    const data = {
      pageTitle: 'All Products',
      products,
      hasProducts,
      activeProducts: true,
      productCSS: true,
    };

    response.render('shop/product-list', data);
  });
};

exports.getIndex = (request, response, next) => {
  Product.fetchAll((products) => {
    const hasProducts = !!products && products.length > 0;
    const data = {
      pageTitle: 'Shop',
      products,
      hasProducts,
      activeShop: true,
      productCSS: true,
    };

    response.render('shop/index', data);
  });
};

exports.getCart = (request, response, next) => {
  const data = {
    pageTitle: 'Your cart',
    activeCart: true,
    productCSS: true,
  };

  response.render('shop/cart', data);
};

exports.getCheckout = (request, response, next) => {
  const data = {
    pageTitle: 'Your checkout',
    activeCheckout: true,
    productCSS: true,
  };

  response.render('shop/checkout', data);
};

exports.getOrders = (request, response, next) => {
  const data = {
    pageTitle: 'Your orders',
    activeOrders: true,
    productCSS: true,
  };

  response.render('shop/orders', data);
};
