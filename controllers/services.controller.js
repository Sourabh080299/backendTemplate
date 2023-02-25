const e = require('../config/errorList');
const sendMailTo = require('../services/email.services');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const forgotPasswordRequest = async (req, res) => {
    try {
        const user = await Users.findOne({ email : req.body.email });
        const type_of_action = e.login.forgotPassword;
        const action_description = e.login.resetPasswordActionDescription;
        const token = await jwt.sign({_id : user._id},process.env.JWT_ACCESS_TOKEN, { expiresIn: '5m' })
        const url = process.env.BASE_URL + '/services/forgotpassword/' + token;
        await sendMailTo(user, url, action_description, type_of_action);
        res.status(200).json({
            message : `Succesfully sent mail for '${type_of_action}' to ${req.body.email}`
        })        
    }
    catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
}

const setNewPassword = async (req, res) => {
    try {
        const newpassword = await bcrypt.hash(req.body.password, 10);
        await Users.updateOne({_id : req.user._id}, {$set : {password : newpassword}});
        res.status(200).json({
            message : e.login.passwordChangedSuccess,
        })
    }
    catch (error){
        res.status(500).json({
            error : error.message,
        })
    }
}




module.exports = {
    forgotPasswordRequest,
    setNewPassword,
}