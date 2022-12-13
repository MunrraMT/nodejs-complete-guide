const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (request, response) => {
  const { products } = adminData;
  response.render('shop', {
    productList: products,
    hasProducts: products.length > 0,
    docTitle: 'Shop Page',
    path: '/',
  });
});

module.exports = router;
