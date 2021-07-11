var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const KubeClientManager = require('./KubeClientManager');
const ProxyManager = require('./ProxyManager');
const HubManager = require('./HubManager');

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
    kubeClientManager.loadContexts();
    kubeClientManager.loadClients();
} catch (e) {
    console.error(e);
}

// load proxies
const proxyManager = new ProxyManager(kubeClientManager);
proxyManager.start();

// load hubs
const hubManager = new HubManager(kubeClientManager);
hubManager.start();

console.log("Started server")

module.exports = {app, kubeClientManager};