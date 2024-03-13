const path = require('path');
const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
    '/add-product',
    [
        body('title', 'please enter a title with at least 3 characters.')
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body('price')
            .isFloat()
            .withMessage('Please enter a valid price.'),
        body('description')
            .isLength({ min: 5 })
            .withMessage('description exceeds minimum length limit of 5 characters.')
            .isLength({ max: 255 })
            .withMessage('description exceeds maximum length limit of 255 characters.')
            .trim()
    ],
    isAuth,
    adminController.postAddProduct
);

// /admin/edit-product => GET
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// /admin/edit-product => POST
router.post(
    '/edit-product',
    [
        body('title', 'please enter a title with at least 3 characters.')
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body('price')
            .isFloat()
            .withMessage('Please enter a valid price.'),
        body('description')
            .isLength({ min: 5 })
            .withMessage('description exceeds minimum length limit of 5 characters.')
            .isLength({ max: 255 })
            .withMessage('description exceeds maximum length limit of 255 characters.')
            .trim()
    ],
    isAuth,
    adminController.postEditProduct
);

// /admin/product/:productId => DELETE
router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;