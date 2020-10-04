const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.post('/alogin', adminController.login);
router.post('/aregister', adminController.register);
router.get('/test', adminController.test);
router.get('/authcheck', adminController.authCheck);

module.exports = router;

