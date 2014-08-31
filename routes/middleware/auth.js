var User = require('../../models/user');

module.exports.getUser = function (req, res, next) {
    // Look for an auth token in the request.
    var authToken = req.param('token');
    if (authToken) {
        User.findOne({
            token: authToken
        }, function (err, user) {
            if (user) {
                req.user = user;
            }
            next();
        });
    }
    else {
        next();
    }
};
