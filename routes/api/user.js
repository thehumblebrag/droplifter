var async = require('async');
var User = require('../../models/user');

SEARCH_RADIUS = 400;

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
    var latlng = req.params.location.split(',').map(Number).reverse();
    var radius = SEARCH_RADIUS;
    var point = {
        type: 'Point',
        coordinates: latlng
    };
    var options = {
        spherical: true,
        maxDistance: radius / 6378137,
        distanceMultiplier: 6378137
    };
    User.geoNear(point, options, function (err, results) {
        async.map(results, function (result, done) {
            done(null, result.obj);
        }, function (err, drops) {
            res.json(drops);
        });
    });
};
