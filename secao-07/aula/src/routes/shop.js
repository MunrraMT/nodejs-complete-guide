const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (request, response, next) => {
  const { products } = adminData;
  const data = {
    products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  };
  console.log(data);
  response.render('shop', data);
});

exports.routes = router;
