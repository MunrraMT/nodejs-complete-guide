const express = require('express');

const { pageNotFountController } = require('../controllers/error');

const router = express.Router();

router.get('/', pageNotFountController);

exports.errorRoute = router;
