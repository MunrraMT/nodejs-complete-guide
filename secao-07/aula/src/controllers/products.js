const products = [];

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
  products.push({ title });
  response.redirect('/');
};

exports.getProducts = (request, response, next) => {
  const data = {
    products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  };

  response.render('shop', data);
};
