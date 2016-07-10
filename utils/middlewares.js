
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.json({error: 'authentication failed'});
    }
}

module.exports = {
    isLoggedIn: isLoggedIn
};