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

  Product.findById(productId)
    .then((result) => {
      const product = { ...result };
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
  Product.fetchAll()
    .then((products) => {
      const hasProducts = !!products && products.length > 0;
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
  const product = new Product({
    title,
    imageUrl,
    description,
    price,
    existentId: productId,
  });

  product
    .save()
    .then(() => {
      response.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (request, response) => {
  const { title, imageUrl, description, price } = request.body;
  const product = new Product({ title, imageUrl, description, price });

  product
    .save()
    .then(() => {
      response.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (request, response) => {
  const { productId } = request.body;

  Product.delete(productId, () => {
    response.redirect('/admin/products');
  });
};
