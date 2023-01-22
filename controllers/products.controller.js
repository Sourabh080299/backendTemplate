const products = require('../models/products.model');

const allProduct = async (req,res)=>{
        
        try{
            const productsList = await products.find();
            res.send(productsList);
        }
        catch (err){
            res.status(400).send(err);
        }
        
}

const saveProduct = async (req,res)=>{
    const myProduct = products({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        discount : req.body.discount,
        stock : req.body.stock,
        category : req.body.category,
    });
    try{
        const savedProduct = await myProduct.save();
        res.send(savedProduct);
    }
    catch (err){
        res.status(400).send(err);
    }

}

module.exports = {
    allProduct,
    saveProduct
};