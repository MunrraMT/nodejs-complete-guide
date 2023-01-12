const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product/', adminController.postEditProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);

router.get('/products', adminController.getProducts);

exports.adminRoutes = router;
