const { studentControllers } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
// const { checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist, checkConfirmPassword } = require('../middleware/authValidator');

const router = require('express').Router();

router.get('/', verifyToken, studentControllers.allSiswa);
router.post('/', verifyToken, studentControllers.createSiswa);
router.patch('/:id', verifyToken, studentControllers.updateSiswa);
router.patch('/disable/:id', verifyToken, studentControllers.disableSiswa);


module.exports = router;