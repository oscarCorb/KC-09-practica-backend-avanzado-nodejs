const express = require('express');
const router = express.Router();

// voy a hacerla y luego mira el del profe
router.get('/', (req, res, next) => {
    res.render('index');
    // console.log('test');
    // res.send('test');
});

// creo que también haría falta la de productos? o esa va en otro módudlo??? ver archivos agentes.js

module.exports = router;
