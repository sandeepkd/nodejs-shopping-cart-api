const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/users', userController.usersList);
router.get('/authcheck', userController.authCheck);

module.exports = router;

