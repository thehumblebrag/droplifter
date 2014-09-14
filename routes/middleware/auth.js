var User = require('../../models/user');

module.exports.requireUser = function (req, res, next) {
    if (!req.user) {
        return res.redirect('/auth/twitter');
    }
    next();
};

module.exports.requireAdmin = function (req, res, next) {
    if (!req.user) {
        return res.redirect('/auth/twitter');
    }
    if (req.user.admin) {
        return next();
    }
    res.send(401);
};

module.exports.getToken = function (req, res, next) {
    // Look for an auth token in the request.
    var auth_token = req.param('token');
    if (auth_token) {
        User.findOne({
            token: auth_token
        }, function (err, user) {
            if (user) {
                req.user = user;
            }
            next();
        });
    }
    else {
        res.send(401);
    }
};
