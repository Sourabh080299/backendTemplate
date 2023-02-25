const e = require('../config/errorList');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/index').Users;
const jwt = require('jsonwebtoken');
const sendMailTo = require('../services/email.services');

const signup = async (req,res)=>{
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const myUser = await User({
        name : req.body.name,
        email : req.body.email,
        verified : false,
        password : req.body.password,
    });

    const isEmailExist = await User.findOne({email : req.body.email});
        if(isEmailExist) return res.status(400).send(e.email.exist)
        try{ 
            const savedUser = await myUser.save();
            const token = jwt.sign({
                    _id: savedUser._id
                }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '5m' }  
            );
            const url = `${process.env.BASE_URL}/users/verify/${token}`;
            const action_description = e.email.verifyEmailActionDescription;
            const type_of_action = e.email.verifyEmail;
            sendMailTo(savedUser, url, action_description, type_of_action);
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
    try {
        const currentUser = await User.findOne({email : req.body.email});
        const token = await jwt.sign({_id : currentUser._id},process.env.JWT_ACCESS_TOKEN,{expiresIn : '15d'});
        res.header({'auth-token' : token}).send(token);
    }
    catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
};

const callBack = (req, res) => {
    res.send('you reached the callback URL');
}

const verifyEmail = (req , res) => {
    const {token} = req.params;
    
    jwt.verify(token , process.env.JWT_ACCESS_TOKEN , async (err , decoded) => {
        if(err){
            console.log(err);
            res.send("Email verification failed, possibly the link is invalid or expired");
        }
        else {
            await User.updateOne({_id : decoded._id},{$set : {verified : true}});
            res.send("Email verified successfully");
        }
    })
}

const logout = (req, res) => {
    res.json({
        message : e.login.logoutSuccess,
        body : req.user
    });
}
module.exports = {
    signup,
    login,
    allUsers,
    callBack,
    verifyEmail,
    logout
}