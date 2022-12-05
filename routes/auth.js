const router = require('express').Router();
const {signup,allUsers} = require('../controllers/auth.controller');

router.post('/register',signup);
router.get('/all',allUsers);

module.exports = router;