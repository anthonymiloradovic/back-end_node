const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/', cartController.getAllCarts);
router.get('/:cartId', cartController.getCartById);
router.post('/', cartController.createCart);
router.put('/:cartId', cartController.updateCartById);
router.delete('/:cartId', cartController.deleteCartById);

module.exports = router;
