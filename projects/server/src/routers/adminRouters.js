const { adminControllers } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
// const { checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist, checkConfirmPassword } = require('../middleware/authValidator');

const router = require('express').Router();

router.post('/', verifyToken, adminControllers.register);
router.post('/login', adminControllers.login);
router.get('/', verifyToken, adminControllers.keeplogin);
router.put('/', adminControllers.forgetPassword);
router.patch('/', verifyToken, adminControllers.resetPassword);

module.exports = router;