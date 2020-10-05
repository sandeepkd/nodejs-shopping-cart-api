const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.post('/alogin', adminController.login);
router.post('/aregister', adminController.register);

module.exports = router;

