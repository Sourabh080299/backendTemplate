const mongoose = require('mongoose');
const e = require('../config/errorList')
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6,
        max : 255,
    },
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, e.email.invalidEmail],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, e.email.invalidEmail]
    },
    verified : {
        type : Boolean,
        defaultValue : false,
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 1000,
    }
});

module.exports = mongoose.model('users' , userSchema);