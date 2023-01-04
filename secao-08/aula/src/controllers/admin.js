const Product = require('../models/product');

const formSetup = [
  { id: 'title', label: 'Title', type: 'text', name: 'title' },
  { id: 'imageUrl', label: 'Image url', type: 'text', name: 'imageUrl' },
  { id: 'price', label: 'Price', type: 'number', step: '0.01', name: 'price' },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    name: 'description',
  },
];

exports.getAddProduct = (request, response, next) => {
  const data = {
    pageTitle: 'Add product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
    form: formSetup,
  };

  response.render('admin/add-product', data);
};

exports.postAddProduct = (request, response, next) => {
  const { title, imageUrl, description, price } = request.body;
  const product = new Product(title, imageUrl, description, price);

  console.log(title, imageUrl, description, price);

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
