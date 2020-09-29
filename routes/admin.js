const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.post('/adminauth', adminController.login);
router.get('/test', adminController.test);
router.get('/authcheck', adminController.authCheck);


module.exports = router;

