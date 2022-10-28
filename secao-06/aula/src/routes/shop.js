const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (request, response) => {
  const { products } = adminData;
  response.render('shop', { productList: products, docTitle: 'Shop Page' });
});

module.exports = router;
