const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (request, response) => {
  console.log('shop.js', adminData.products);
  response.render('shop');
});

module.exports = router;
