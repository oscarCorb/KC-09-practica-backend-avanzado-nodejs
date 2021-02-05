'use strict';

const mongoose = require('mongoose');

// schema definition
const productSchema = mongoose.Schema({
    name: { type: String, index: true },
    price: { type: Number, index: true },
    new: Boolean,
    tags: [String],
    description: { type: String },
    image: String,
});

productSchema.statics.list = function (filter, limit, skip, fields, sort) {
    const query = Product.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();
};
// model creation
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
