const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');

const router = express.Router();

router.get('/add-product', (request, response) => {
  response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (request, response) => {
  const { title } = request.body;
  console.log(title);
  response.redirect('/');
});

module.exports = router;
