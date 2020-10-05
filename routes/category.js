const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

router.post('/add-category', categoryController.create);
router.get('/category-list', categoryController.list);

module.exports = router;

