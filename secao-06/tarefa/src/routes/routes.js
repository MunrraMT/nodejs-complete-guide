const express = require('express');

const router = express.Router();
const usersDB = [];

router.get('/', (request, response) => {
  const data = {
    pageTitle: 'home',
    homePage: true,
  };

  response.status(200).render('index', data);
});

router.post('/', (request, response) => {
  const { user } = request.body;

  if (user) usersDB.push({ user });

  response.status(202).redirect('/');
});

router.get('/users', (request, response) => {
  const data = {
    pageTitle: 'users',
    usersPage: true,
    userList: usersDB,
    hasUser: usersDB.length > 0,
  };

  console.log(usersDB);

  response.status(200).render('users', data);
});

module.exports = router;
