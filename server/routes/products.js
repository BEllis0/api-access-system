const router = require('express').Router();
const productControllers = require('../controllers/products.js');

// all products
router.get('/', productControllers.products.all);

// by product name
router.get('/name', productControllers.products.searchBy.name);

// by price range
router.get('/price', productControllers.products.searchBy.priceRange);

// by color
router.get('/color', productControllers.products.searchBy.color);

module.exports = router;