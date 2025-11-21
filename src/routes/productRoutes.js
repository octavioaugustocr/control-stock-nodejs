const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const { validateProductData } = require('../middlewares/productValidation');

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductById);

router.post('/', validateProductData, ProductController.createProduct);

router.put('/:id', validateProductData, ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);

module.exports = router;