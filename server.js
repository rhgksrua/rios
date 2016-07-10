'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
mongoose.Promise = require('bluebird');

// Setting environment variables through .env file
require('dotenv').config({silent: true});

const app = express();

// Logging
app.use(morgan('combined'));

// Parse forms/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./config/passport')(passport);

const port = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.IP + "/rios";

mongoose.connect(MONGO_URI);

app.use(session({
    secret: 'riossessionsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 365 },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());

// Templates
app.set('view engine', 'pug');
app.set('views', 'templates');

// public directory.
app.use(express.static(__dirname + '/public'));

const userRoute = require('./routes/userRoute.js')(passport);
app.use('/user', userRoute);

app.get('/*', index);

function index(req, res) {
    console.log('--- req user', req.user);
    console.log('--- session', req.session);
    if (process.env.NODE_ENV === 'development') {
        return res.render('index');
    }
    return res.render('production');
}

app.listen(port, function() {
    console.log('http://localhost:' + port);
});
