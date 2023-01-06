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

exports.getProductDetails = (request, response, next) => {
  const { productId } = request.params;

  Product.findById(productId, (result) => {
    if (!result.success) response.redirect('/');

    const data = {
      pageTitle: result.data.title,
      product: result.data,
      activeShop: true,
      productCSS: true,
    };

    response.render('shop/product-detail', data);
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
