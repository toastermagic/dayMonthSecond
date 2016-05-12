var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var dotenv = require('dotenv');
var jwt = require('express-jwt');
var cors = require('cors');
var http = require('http');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var router = express.Router();

// dotenv.load();

var authenticate = jwt({
  secret: new Buffer('XAOtQLyyK5Rf4wrE0T60BsxzYFz4g5hrYpcY4GLh7dugGXiuNJEy4bjBciMEWGrX', 'base64'),
  audience: '0DkTCPKzFbJPEow18W1eT2yzT3VtJJTw'
});

app.use(cors());
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/../wwwroot'));

app.use('/', routes);
app.use('/users', users);
app.use('/secured', authenticate);
app.use('/vendor', express.static(__dirname + '/../node_modules'));

app.get('/ping', function(req, res) {
  res.send("All good. You don't need to be authenticated to call this");
});


app.get('/secured/ping', function(req, res) {
  res.status(200).send("All good. You only get this message if you're authenticated");
});

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

module.exports = app;
