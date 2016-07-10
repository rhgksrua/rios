'use strict';

const express = require('express');
const router = express.Router();
const isLoggedIn = require('../utils/middlewares').isLoggedIn;

module.exports = function(passport) {
    
    router.post('/signup', passport.authenticate('local-signup'),
        function(req, res) {
            const userInfo = {
                email: req.user.email,
                first: req.user.first,
                last: req.user.last
            };
            return res.json(userInfo);
        }
    );
    
    router.post('/login', passport.authenticate('local-login'),
        function(req, res) {
            const userInfo = {
                email: req.user.email,
                first: req.user.first,
                last: req.user.last
            };
            return res.json(userInfo);
        }
    );
    
    // Check if user is logged in
    router.post('/status', isLoggedIn, function(req, res) {
        const userInfo = {
            email: req.user.email,
            first: req.user.first,
            last: req.user.last
        };
        return res.json(userInfo);
    });
    
    router.post('/logout', function(req, res) {
        req.logout();
        return res.json({logout: true});
    });
    return router;
};

