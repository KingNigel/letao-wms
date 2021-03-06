var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var user = require('./routes/user');
var product = require('./routes/product');
var category = require('./routes/category');
var cart = require('./routes/cart');
var address = require('./routes/address');
var app = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'itcast-secret',
  name: 'itcast-name',
  cookie: { maxAge: 8000000000 },
  resave: false,
  saveUninitialized: true,
}));
app.use('/employee', employee);
app.use('/product', product);
app.use('/category', category);
app.use('/cart', cart);
app.use('/address', address);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
});


module.exports = app;
