const express = require('express');

const shopController = require('../controllers/shop');

const route = express.Router();

route.get('/', shopController.getIndex);
route.get('/checkout', shopController.getCheckout);

route.get('/cart', shopController.getCartProducts);
route.post('/cart', shopController.postCartAddProduct);
route.post('/cart/delete-product', shopController.postCartDeleteProduct);

route.get('/products', shopController.getProducts);
route.get('/products/:productId', shopController.getProductDetails);

route.get('/orders', shopController.getOrders);
route.post('/create-order', shopController.postOrders);

exports.shopRoutes = route;
