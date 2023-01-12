const Product = require('../models/product');

exports.getAddProduct = (request, response) => {
  const data = {
    pageTitle: 'Add product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editingForm: false,
  };

  response.render('admin/edit-product', data);
};

exports.getEditProduct = (request, response) => {
  const { edit } = request.query;
  const { productId } = request.params;
  if (!edit || !productId) {
    response.redirect('/');
  } else {
    Product.findById(productId, (product) => {
      if (product.success) {
        const data = {
          pageTitle: 'Add product',
          formCSS: true,
          productCSS: true,
          editingForm: edit,
          productData: product.data,
        };

        response.render('admin/edit-product', data);
      } else {
        response.redirect('/');
      }
    });
  }
};

exports.postEditProduct = (request, response) => {
  response.redirect('/');
};

exports.postAddProduct = (request, response) => {
  const { title, imageUrl, description, price } = request.body;
  const product = new Product(title, imageUrl, description, price);

  product.save((message) => {
    console.log(message);
    response.redirect('/');
  });
};

exports.getProducts = (request, response) => {
  Product.fetchAll((products) => {
    const hasProducts = !!products && products.length > 0;
    const data = {
      pageTitle: 'Admin Products',
      products,
      hasProducts,
      activeAdminProducts: true,
      productCSS: true,
    };

    response.render('admin/list-product', data);
  });
};
