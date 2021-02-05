'use strict';

const mongoose = require('mongoose');
const fs = require('fs');

const Product = require('../models/Product');
const jsonProducts = require('../data/products.json');

// mongoose connection module
require('../lib/connectMongoose');

async function initDB() {
    try {
        await Product.deleteMany();
        await Product.insertMany(jsonProducts);
        mongoose.connection.close();
    } catch (err) {
        console.log('Database error.', err);
    }
}

initDB();
