const router = require('express').Router();
const productController = require('../controllers/productController');

router.post('/add-product', productController.create);
router.get('/product-list', productController.list);
router.post('/product-delete', productController.deleteItem);
router.post('/product', productController.details);

module.exports = router;

