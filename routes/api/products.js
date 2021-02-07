'use strict';

const express = require('express');

const router = express.Router();

const Product = require('../../models/Product');

///////////////////////////////////////////////////////////////////
// PRACTICAR: HACER LUEGO TODO ESTE CÓDIGO CON PROMESAS Y CALLBACKS
///////////////////////////////////////////////////////////////////

/////////// HABRÁ QUE REVISAR POR QUÉ NO ME FUNCIONAN LOS 'if(!producto)' que hacía el profe
/////////// Luego habrá que comparar este archivo con el del profe (en el mío faltan cosas)

// router => /api/products/

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

        const filter = {};

        if (name) {
            filter.name = name;
        }

        if (price) {
            if (price.includes('-')) {
                const prices = price.split('-');
                const priceA = parseInt(prices[0]);
                const priceB = parseInt(prices[1]);

                if (!priceA) {
                    filter.price = { $lte: priceB };
                } else if (!priceB) {
                    filter.price = { $gte: priceA };
                } else if (priceA < priceB) {
                    console.log('<---# A es menor que B #--->');
                    filter.price = { $gte: priceA, $lte: priceB };
                } else if (priceA > priceB) {
                    console.log('<---@ A es mayor que B @--->');
                    filter.price = { $lte: priceA, $gte: priceB };
                }
            } else {
                filter.price = price;
            }
        }

        if (newProduct) {
            filter.new = newProduct;
        }

        if (tags) {
            filter.tags = { $in: tags };
        }

        const products = await Product.list(filter, limit, skip, fields, sort);
        res.json({ result: products });
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

// create a new item
router.post('/', async (req, res, next) => {
    try {
        const productData = req.body;
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

        //////////////// ESTO NO ME FUNCIONA ////////////////
        if (!updatedProduct) {
            res.status(404).json({ error: 'not found' });
        }

        res.json({ Updated: updatedProduct });
    } catch (error) {
        // no sé si puedo poner el res.json aquí antes del NEXT
        // res.json({ Error: 'Not found. Please check the ID' });
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
