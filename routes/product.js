const router = require('express').Router();
const productController = require('../controllers/productController');

router.post('/add-product', productController.create);
router.get('/product-list', productController.list);
router.post('/product-delete', productController.deleteItem);

module.exports = router;

