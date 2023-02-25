const e = require('../config/errorList');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const bcrypt = require('bcrypt');

const passwordVerification = (req, res, next) => {
    if(req.body.password === req.body.confirmPassword){
        next();
    }
    else {
        res.status(500).json({
            error : e.login.passwordAndconfirmPasswordDifferent
        })
    }
}

const OldPasswordVerification = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id : req.user._id});
        const isValidPassword = await bcrypt.compare(req.body.oldPassword, user.password);
        if(isValidPassword){
            next();
        }
        else{
            res.status(500).json({
                error : e.login.invalidOldPassword
            })
        }        
    }
    catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
}
module.exports = {
    passwordVerification,
    OldPasswordVerification
}