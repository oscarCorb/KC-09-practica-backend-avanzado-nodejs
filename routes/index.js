const express = require('express');
// const { locals } = require('../app');
const Product = require('../models/Product');
const router = express.Router();

// voy a hacerla y luego comparo con la del del profe
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/products', async (req, res, next) => {
    // esto es un array de objetos:
    res.locals.products = await Product.find();
    res.render('list');
});

module.exports = router;
