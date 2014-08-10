var User = require('../../models/user');

module.exports.get = function (req, res) {
    User.find().limit(10).exec(function (err, users) {
        if (err) {
            return res.json(502, { error: err });
        }
        res.json(users);
    });
};

module.exports.find = function (req, res) {
    var id = req.param.id;
    User.findById(id, function (err, user) {
        if (err) {
            return res.json(502, { error: err });
        }
        res.json(user);
    });
};

module.exports.geoFind = function (req, res) {
    res.json([]);
};
