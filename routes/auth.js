const router = require('express').Router();
const {signup,login,allUsers} = require('../controllers/auth.controller');

router.post('/register',signup);
router.get('/all',allUsers);
router.post('/login',login);
module.exports = router;