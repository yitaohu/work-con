var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');

var appRoutes = require('./routes/app');
var qaRoutes = require('./routes/qa')
var devRoutes = require('./routes/dev')
var residualRoutes = require('./routes/residual')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'wb16x16_onblack.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/dev', devRoutes)
app.use('/testing', qaRoutes)
app.use('/residual',residualRoutes)
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
   });

module.exports = app;
