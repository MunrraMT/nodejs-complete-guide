const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');

const router = express.Router();

const products = [];

router.get('/add-product', (request, response) => {
  response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (request, response) => {
  const { title } = request.body;
  products.push({ title });
  response.redirect('/');
});

exports.routes = router;
exports.products = products;
