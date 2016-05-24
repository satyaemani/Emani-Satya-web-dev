/**
 * Created by subbaraju on 23/5/2016.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(3100);
