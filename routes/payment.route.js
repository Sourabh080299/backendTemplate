const { createCustomers } = require('../controllers/payment.controller');

const router = require('express').Router();


router.post('/payment',createCustomers);
 
module.exports = router;