const { ajaranControllers } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
// const { checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist, checkConfirmPassword } = require('../middleware/authValidator');

const router = require('express').Router();

router.get('/', verifyToken, ajaranControllers.allTahunAjar);
router.post('/', verifyToken, ajaranControllers.createTahunAjar);
router.patch('/:id', verifyToken, ajaranControllers.updateTahunAjar);
router.patch('/disable/:id', verifyToken, ajaranControllers.disableTahunAjar);


module.exports = router;