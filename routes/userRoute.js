'use strict';

const express = require('express');
const router = express.Router();

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
    router.post('/status', isLoggedIn, function(req, res) {
        console.log('--- checking user session exists', req.user);
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
    })
    return router;
    
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.json({error: 'authentication failed'});
    }
}

