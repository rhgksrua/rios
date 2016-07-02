'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Setting environment variables through .env file
require('dotenv').config({silent: true});

var app = express();

// Logging
app.use(morgan('combined'));

// Parse forms/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var port = process.env.PORT || 3000;

// Templates
app.set('view engine', 'pug');
app.set('views', './templates');

// public directory.
app.use(express.static(__dirname + '/public'));

app.get('/', index);

function index(req, res) {
    return res.render('index');
}

app.listen(port, function() {
    console.log('http://localhost:' + port);
});
