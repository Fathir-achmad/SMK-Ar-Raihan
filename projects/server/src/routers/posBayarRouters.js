const { posBayarControllers } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
// const { checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist, checkConfirmPassword } = require('../middleware/authValidator');

const router = require('express').Router();

router.get('/', verifyToken, posBayarControllers.allPosBayar);
router.post('/', verifyToken, posBayarControllers.createPosBayar);
router.patch('/:id', verifyToken, posBayarControllers.updatePosbayar);
router.patch('/disable/:id', verifyToken, posBayarControllers.disablePosBayar);


module.exports = router;