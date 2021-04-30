'use strict';

const mongoose = require('mongoose');

// mongoose connection module
require('./lib/connectMongoose');

const jsonProducts = require('./data/products.json');
const Product = require('./models/Product');
const User = require('./models/User');

main().catch((err) => console.error('Database error.', err));

async function main() {
  await initProducts();
  await initUsers();
  mongoose.connection.close();
}

async function initProducts() {
  const { deletedCount } = await Product.deleteMany();
  console.log(`Deleted ${deletedCount} poducts.`);

  const result = await Product.insertMany(jsonProducts);

  console.log(`Inserted ${result.length} products.`);
}

async function initUsers() {
  const { deletedCount } = await User.deleteMany();
  console.log(`Deleted ${deletedCount} users.`);

  const result = await User.insertMany([
    {
      email: 'user@example.com',
      password: 1234,
    },
    {
      email: 'test@test.com',
      password: 1234,
    },
  ]);

  console.log(`Inserted ${result.length} users.`);
}
