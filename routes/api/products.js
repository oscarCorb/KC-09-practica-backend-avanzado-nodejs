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
    console.log('->>>> get all items');
    try {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const fields = req.query.fields;
        const sort = req.query.sort;

        const name = req.query.name;
        const price = req.query.price;
        const newProduct = req.query.new;
        // const tags = req.query.tags;
        const tags = req.query.tags;

        const filter = {};
        let tagsArray;

        if (name) {
            filter.name = name;
            // console.log('->', name);
        }

        if (price) {
            filter.price = price;

            // const price2 = price.split('-');
            // console.log('price2->', price2);

            // EJEMPLO WEB MongoDB: db.inventory.find( { status: "A", qty: { $lt: 30 } } )

            // /[0-9]+-{1}/.test(price) ? ...

            // console.log('->>', price2[0], parseInt(price2[0]));

            // filter.price = { price: { $gte: price2[0], $lte: price2[1] } };
        }
        // console.log('filter.price-:>', filter.price);

        // pista: { precio: { $gte: 10, $lte: 80} }

        if (newProduct) {
            filter.new = newProduct;
        }

        if (tags) {
            filter.tags = { $in: tags };
        }

        // name ? (filter.name = name) : null;
        // price ? (filter.price = price) : null;
        // newProduct ? (filter.new = newProduct) : null;
        // tags ? (filter.tags = tags) : null;

        // console.log('filter->', filter);
        // console.log('tags->', tags);

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
        // if (!updatedProduct) {
        //     res.status(404).json({ error: 'not found' });
        // }

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
