const router = require('express').Router();
const { forgotPasswordRequest, setNewPassword } = require('../controllers/services.controller');
const { tokenVerification} = require('../middleware/auth.middleware');
const { passwordVerification, OldPasswordVerification } = require('../middleware/services.middleware');

router.get('/forgotpassword',forgotPasswordRequest);
router.put('/forgotpassword/:token', tokenVerification, passwordVerification, setNewPassword);

router.put('/resetpassword/', tokenVerification, OldPasswordVerification, passwordVerification, setNewPassword);

module.exports = router;