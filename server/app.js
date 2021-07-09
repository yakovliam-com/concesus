var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const KubeClientManager = require('./KubeClientManager');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// load kube client manager
const kubeClientManager = new KubeClientManager();

try {
    kubeClientManager.loadClients();
} catch (e) {
    console.error(e);
}

console.log("Started server")

module.exports = app;
