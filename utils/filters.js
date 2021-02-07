module.exports = (name, price, newProduct, tags) => {
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

    return filter;
};
