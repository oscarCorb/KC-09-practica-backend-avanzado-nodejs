'use strict';

const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const filters = require('../../utils/filters');
const multer = require('multer');

// router -> "/api/products/"

// get all items
router.get('/', async (req, res, next) => {
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

    const products = await Product.list(filtered, limit, skip, fields, sort);
    const productList = products.reverse();

    res.json({ result: productList });
  } catch (error) {
    next(error);
  }
});

// get all tags
router.get('/tags', async (req, res, next) => {
  try {
    const tags = await Product.distinct('tags');
    res.json({ tags: tags });
  } catch (error) {
    next(error);
  }
});

// get one item by id
router.get('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({ _id: _id });
    res.json({ result: product });
  } catch (error) {
    next(error);
  }
});

// upload image from API
const multerStorage = multer.diskStorage({
  destination: 'public/images/products',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: multerStorage });

// create a new item
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const productData = req.body;
    productData.image = req.file.originalname;
    const product = new Product(productData);
    const madeProduct = await product.save();
    res.status(201).json({ Added: madeProduct });
  } catch (error) {
    next(error);
  }
});

// update one item
router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const newData = req.body;
    const updatedProduct = await Product.findOneAndUpdate({ _id: _id }, newData, {
      new: true,
      useFindAndModify: false,
    });
    res.json({ Updated: updatedProduct });
  } catch (error) {
    next(error);
  }
});

// delete one item
router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const product = await Product.find({ _id: _id });
    await Product.deleteOne({ _id: _id });
    res.json({ Deleted: product });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
