const e = require('../config/errorList');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/index').Users;

const signup = async (req,res)=>{
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const myUser = await User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    });

    const isEmailExist = await User.findOne({email : req.body.email});
    if(isEmailExist) return res.status(400).send(e.email.exist)
    
    try{
        const savedUser = await myUser.save();
        res.json(savedUser);
    }
    catch ( err ) {
        res.status(400).json({message : err});
    }     
};

const allUsers = async (req,res)=>{
    try{
        const myUsers = await User.find();
        res.json(myUsers);
    }
    catch (err) {
        res.status(400).json({message : err});
    }
};


module.exports = {
    signup,
    allUsers,
}