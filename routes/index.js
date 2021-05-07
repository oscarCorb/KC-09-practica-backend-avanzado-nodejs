const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const filters = require('../utils/filters');

// GET home page
router.get('/', (req, res, next) => {
  res.redirect('/products');
});

// GET product list
router.get('/products', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const name = req.query.name;
    const price = req.query.price;
    const newProduct = req.query.new;
    const tags = req.query.tags;

    const filtered = filters(name, price, newProduct, tags);

    res.locals.products = await Product.list(filtered, limit, skip, fields, sort);
    res.render('index');
  } catch (error) {
    next(error);
  }
});

// GET tag list
router.get('/products/tags', async (req, res, next) => {
  const tags = await Product.distinct('tags');
  console.log('tags----->', tags);
  res.render('tags', { setTags: tags });
});

// GET individual products
router.get('/products/:name', async (req, res, next) => {
  const name = req.params.name;
  res.locals.article = await Product.findOne({ name: name });
  res.render('product');
});

module.exports = router;
