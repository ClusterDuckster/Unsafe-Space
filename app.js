// app.js

//second file to be run after bin/www

//npm packages
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var flash    = require('connect-flash');

//own packages
var gameRoutes = require('./routes/game');
var shoutoutRoutes = require('./routes/shoutouts');
var startRoutes = require('./routes/startUp');
var authRoutes = require('./routes/auth');
var dbConfig = require('./assets/config/database');

//connect database
mongoose.connect(dbConfig.url, { useMongoClient: true });
mongoose.Promise = bluebird;

//express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//allow cross origin requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/auth', authRoutes);
app.use('/shoutout', shoutoutRoutes);
app.use('/game', gameRoutes);
app.use('/', startRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
