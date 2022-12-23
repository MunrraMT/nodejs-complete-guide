const express = require('express');

const { getProducts } = require('../controllers/products');

const route = express.Router();

route.get('/', getProducts);

exports.shopRoutes = route;
