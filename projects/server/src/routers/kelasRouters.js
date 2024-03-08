const { kelasControllers } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
// const { checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist, checkConfirmPassword } = require('../middleware/authValidator');

const router = require('express').Router();

router.get('/', verifyToken, kelasControllers.allKelas);
router.post('/', verifyToken, kelasControllers.createKelas);
router.patch('/:id', verifyToken, kelasControllers.updateKelas);
router.patch('/disable/:id', verifyToken, kelasControllers.disableKelas);


module.exports = router;