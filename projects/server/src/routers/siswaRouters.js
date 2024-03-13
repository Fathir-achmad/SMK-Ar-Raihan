const { siswaControllers } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
// const { checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist, checkConfirmPassword } = require('../middleware/authValidator');

const router = require('express').Router();

router.get('/', verifyToken, siswaControllers.allSiswa);
router.post('/', verifyToken, siswaControllers.createSiswa);
router.patch('/:id', verifyToken, siswaControllers.updateSiswa);
router.patch('/disable/:id', verifyToken, siswaControllers.disableSiswa);


module.exports = router;