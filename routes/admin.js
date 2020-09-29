const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.post('/adminauth', adminController.login);
router.post('/test', adminController.test);
router.post('/auth', adminController.authCheck);


module.exports = router;

