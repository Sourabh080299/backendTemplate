const router = require('express').Router();
const {signup, login, allUsers, callBack, verifyEmail, logout} = require('../controllers/auth.controller');
const passport = require('passport');
const { authentication, tokenVerification } = require('../middleware/auth');

router.post('/register',signup);
router.get('/all',allUsers);
router.post('/login',authentication,login);
router.get('/verify/:token',verifyEmail);
router.get('/google',passport.authenticate('google',{
    scope : ['email','profile']
}));
router.get('/google/redirect',passport.authenticate('google'),callBack);
router.post('/logout',tokenVerification,logout);
module.exports = router;