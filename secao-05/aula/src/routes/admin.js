const express = require('express');

const router = express.Router();

router.get('/add-product', (request, response) => {
  response.send(
    '<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Add product</button></form>',
  );
});

router.post('/product', (request, response) => {
  const { title } = request.body;
  console.log(title);
  response.redirect('/');
});

module.exports = router;
