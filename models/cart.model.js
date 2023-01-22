const mongoose = require('mongoose');
const cartItem = require('./cartItem.model');
const cartSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    cartItems : {
        type : cartItem
    }
    
});

module.exports = cartSchema.model('cart',cartSchema);