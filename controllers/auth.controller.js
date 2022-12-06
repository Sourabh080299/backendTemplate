const e = require('../config/errorList');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/index').Users;
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

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

const login = async (req,res) =>{
    const currentUser = await User.findOne({email : req.body.email});
    if(!currentUser) return res.status(400).send(e.email.emailNoTRegistered);

    const isPasswordVaild = await bcrypt.compare(req.body.password,currentUser.password);
    if(!isPasswordVaild) return res.status(400).send(e.login.invalidPassword);
    const token = await jwt.sign({_id : currentUser._id},process.env.JWT_ACCESS_TOKEN);
    res.header({'auth-token' : token}).send(token);
};
module.exports = {
    signup,
    login,
    allUsers,
}