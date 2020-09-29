const router = require('express').Router();
const campaignController = require('../controllers/campaignController');
router.post('/campaigns/create', campaignController.create);
router.get('/campaigns/list', campaignController.list);

module.exports = router;

