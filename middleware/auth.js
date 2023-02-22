const e = require('../config/errorList');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const bcrypt = require('bcrypt');

const authentication = async (req , res , next) => {
    try {
        let user = Users.findOne({email : req.body.email});
        if(!user){
            res.status(500).json({
                error : e.email.invalidEmail
            })
        }
        else {
            if(await bcrypt(req.body.password,user.password)){
                req.user = user;
                next();
            }
            else {
                res.status(404).json({
                    error : e.users.invalidUserCredentials
                })
            }
        }
    }
    catch (err) {
        res.status(500).json({
            error : err
        })
    }
}

const tokenVerification= async (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token)return res.status(500).send(e.login.invalidToken);
    try {
        const verified = jwt.verify(token,process.env.JWT_ACCESS_TOKEN);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send(e.verification.notVerifiedEmail);
    }
};

module.exports = {
    tokenVerification,
    authentication
}