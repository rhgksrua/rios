'use strict';

var LocalStrategy = require('passport-local');
var User = require('../models/User');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            const query = {'email': email}
            User.findOne(query, function(err, user) {
                // db error
                if (err) return done(err);
                
                // user exists
                if (user) return done(null, false);
                
                // add new user
                var newUser = new User();
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.first = req.body.first;
                newUser.last = req.body.last;
                newUser.save(function(err) {
                    if (err) throw err;
                    return done(null, newUser);
                });
            });
        });
    }));
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        console.log(email, password);
        process.nextTick(function() {
            User.findOne({'email': email}, function(err, user) {
                // db error
                if (err) return done(err);
                
                // user does not exist
                if (!user) {
                    return done(null, false);
                }
                
                // wrong password
                if (!user.validPassword(password)) {
                    return done(null, false);
                }
                
                return done(null, user);
            });
        });
    }));
};