const cart = require('../models/index').Cart;
const getCart = async (req , res) =>{
    try{
        const myCart = await cart.find();
        res.send(myCart);
    }
    catch (err){
        res.status(400).send(err);
    }
}

const addToCart = async (req , res) =>{
    // const mycartItem = cartItem({
    //     productId : req.body.productId,
    //     quantity : req.body.quantity,
    //     cartItemPrice : req.body.cartItemPrice,
    //     productName : req.body.productName,
    //     image : req.body.image,
    //     discountedPrice : req.body.discountedPrice
    // })
    const myCart = cart({
        userId : req.body.userId,
        // cartItem : mycartItem
        productId : req.body.productId,
        quantity : req.body.quantity,
        cartItemPrice : req.body.cartItemPrice,
        productName : req.body.productName,
        image : req.body.image,
        discountedPrice : req.body.discountedPrice
    });
    try{
        const savedCart = await myCart.save();
        res.send(savedCart);
    }
    catch (err){
        res.status(400).send(err);
    }
}


module.exports = {
    getCart,
    addToCart
}


