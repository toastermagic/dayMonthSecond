/// <reference path="./typings/main.d.ts"/>

import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';

import {FirebaseService} from './firebase-service';

var http = require('http');
var app = express();
// var router = express.Router();
var fb = new FirebaseService();

// view engine setup
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use(express.static(__dirname + '/../wwwroot'));

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.sendfile('index.html', {root: __dirname + '/../wwwroot'});
});

var port = process.env.PORT || 5000;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

fb.users();

module.exports = app;
