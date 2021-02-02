'use strict';

const mongoose = require('mongoose');

// schema definition
const productSchema = mongoose.Schema({
    name: { type: String, index: true },
    price: { type: Number, index: true },
    condition: Boolean,
    tags: [String],
    image: String,
});

///////////////////////////////////////////////////////////////
// aquí en clase creamos un método estático PARA LOS FILTROS
//////////////////////////////////////////////////////////////

// model creation
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
