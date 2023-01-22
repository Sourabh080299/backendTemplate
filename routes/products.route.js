const express = require('express');
const router = express.Router();
const {allProduct, saveProduct } = require('../controllers/products.controller')
router.get('/',allProduct);
router.post('/',saveProduct);

module.exports = router;