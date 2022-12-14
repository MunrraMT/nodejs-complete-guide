const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');

const router = express.Router();

const products = [];

router.get('/add-product', (request, response) => {
  response.render('add-product', {
    docTitle: 'Add product',
    path: '/admin/add-product',
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true,
  });
});

router.post('/add-product', (request, response) => {
  const { title } = request.body;
  products.push({ title });
  response.redirect('/');
});

exports.routes = router;
exports.products = products;
