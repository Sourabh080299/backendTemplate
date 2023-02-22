const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    // cartItems : {
    //     type : cartItem
    // }
    productId : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
    },
    cartItemPrice : {
       type : Number,
       required : true
    },
    productName : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    discountedPrice : {
        type : Number,
        required : true
    }
    
});

module.exports = mongoose.model('cart',cartSchema);