'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', (err) => {
    console.log('Error connection.', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB in', mongoose.connection.name);
});

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/nodeCasaDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
