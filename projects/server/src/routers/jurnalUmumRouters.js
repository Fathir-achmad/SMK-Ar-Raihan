const { jurnalUmumControllers } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
// const { checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist, checkConfirmPassword } = require('../middleware/authValidator');

const router = require('express').Router();

router.get('/', verifyToken, jurnalUmumControllers.allJurnalUmum);
router.post('/', verifyToken, jurnalUmumControllers.createJurnalUmum);
router.patch('/:id', verifyToken, jurnalUmumControllers.updateJurnalUmum);
router.patch('/disable/:id', verifyToken, jurnalUmumControllers.disableJurnalUmum);


module.exports = router;