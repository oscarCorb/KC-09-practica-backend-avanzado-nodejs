var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.siteTitle = 'nodeCasa';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API routes
app.use('/api/productos', require('./routes/api/products'));

// website routes
app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));

// static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    if (err.array) {
        const errorInfo = err.array({ onlyFirstError: true })[0];
        err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
        err.status = 422;
    }

    res.status(err.status || 500);

    if (isAPIRequest(req)) {
        res.json({ error: err.message });
        return;
    }

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.render('error');
});

function isAPIRequest(req) {
    return req.originalUrl.indexOf('/api/') === 0;
}

module.exports = app;
