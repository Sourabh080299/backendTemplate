const e = require('../config/errorList');
const jwt = require('jsonwebtoken');

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
}