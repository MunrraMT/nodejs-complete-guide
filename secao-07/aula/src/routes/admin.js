const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (request, response, next) => {
  const data = {
    pageTitle: 'Add product',
    path: '/admin/add-product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  };

  response.render('add-product', data);
});

router.post('/add-product', (request, response, next) => {
  const { title } = request.body;
  products.push({ title });
  response.redirect('/');
});

exports.routes = router;
exports.products = products;
