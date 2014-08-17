var async = require('async');
var Drop = require('../../models/drop');

SEARCH_RADIUS = 400;

module.exports.get = function (req, res) {
    Drop.find().limit(10).exec(function (err, drops) {
        if (err) {
            return res.json(502, { error: err });
        }
        res.json(drops);
    });
};

module.exports.find = function (req, res) {
    var id = req.param.id;
    Drop.findById(id, function (err, drop) {
        if (err) {
            return res.json(502, { error: err });
        }
        res.json(drop);
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
    Drop.geoNear(point, options, function (err, results) {
        async.map(results, function (result, done) {
            result.obj.populate('user', function (err, drop) {
                console.log('drop', drop);
                done(null, drop);
            });
        }, function (err, drops) {
            res.json(drops);
        });
    });
};
