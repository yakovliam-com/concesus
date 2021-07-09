var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const k8s = require('@kubernetes/client-node');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const cluster = {
    name: process.env['CLUSTER.NAME'],
    server: process.env['CLUSTER.SERVER']
};

const user = {
    name: process.env['USER.USERNAME'],
    password: process.env['USER.PASSWORD'],
};

const context = {
    name: process.env['CONTEXT.NAME'],
    user: user.name,
    cluster: cluster.name,
};

const kc = new k8s.KubeConfig();
kc.loadFromOptions({
    clusters: [cluster],
    users: [user],
    contexts: [context],
    currentContext: context.name,
});
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

console.log("Started server")

module.exports = app;
