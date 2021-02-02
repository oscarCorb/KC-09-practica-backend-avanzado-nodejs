'use strict';

const mongoose = require('mongoose');
const fs = require('fs');

// mongoose connection module
const Product = require('../models/Product');

// JSON file with sample products
const jsonProducts = require('../public/json/products.json');

// cargar módulo conexión Mongoose
require('./connectMongoose');

async function initDB() {
    try {
        await Product.deleteMany();
        await Product.insertMany(jsonProducts);
    } catch (err) {
        console.log('Database error.', err);
    }
}

initDB();
