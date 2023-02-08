const { v4: uuidV4 } = require('uuid');

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
  }

  Product.findByPk(productId)
    .then((result) => {
      const product = result.dataValues;
      const data = {
        pageTitle: 'Add product',
        formCSS: true,
        productCSS: true,
        editingForm: edit,
        productData: product,
      };

      response.render('admin/edit-product', data);
    })
    .catch((err) => {
      console.log(err);
      response.redirect('/');
    });
};

exports.getProducts = (request, response) => {
  Product.findAll()
    .then((result) => {
      const hasProducts = result.length > 0;
      const products = result.map((product) => product.dataValues);
      const data = {
        pageTitle: 'Admin Products',
        products,
        hasProducts,
        activeAdminProducts: true,
        productCSS: true,
      };

      response.render('admin/list-product', data);
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (request, response) => {
  const { title, imageUrl, description, price, productId } = request.body;
  Product.update(
    { title, imageUrl, description, price },
    { where: { id: productId } },
  )
    .then(() => {
      response.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (request, response) => {
  const { title, imageUrl, description, price } = request.body;
  request.user
    .createProduct({
      id: uuidV4(),
      title,
      imageUrl,
      description,
      price,
    })
    .then((result) => {
      console.log(result);
      response.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (request, response) => {
  const { productId } = request.body;

  Product.destroy({ where: { id: productId } })
    .then(() => {
      response.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};
