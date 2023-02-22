const express = require('express');
const router = express.Router();
const {getCart, addToCart} = require('../controllers/cart.controller');
router.get('/',getCart);
router.post('/',addToCart);

module.exports = router;