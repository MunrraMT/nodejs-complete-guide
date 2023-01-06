const express = require('express');

const shopController = require('../controllers/shop');

const route = express.Router();

route.get('/', shopController.getIndex);
route.get('/cart', shopController.getCart);
route.get('/checkout', shopController.getCheckout);
route.get('/orders', shopController.getOrders);

route.get('/products', shopController.getProducts);
route.get('/products/:productId', shopController.getProductDetails);

exports.shopRoutes = route;
