
var express = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var app = express();
var passport = require('passport');


var connectionString = 'mongodb://127.0.0.1:27017/cs5610summer1';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret:process.env.SESSION_SECRET}));

//initializing passport after session
app.use(passport.initialize());
app.use(passport.session());
// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//var assignment = require("./assignment/app.js");
//assignment(app);
var project = require("./project/app.js");
project(app);
app.listen(port, ipaddress);
