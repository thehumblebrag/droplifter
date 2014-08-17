var async = require('async');
var droplifter = require('../../');
var Drop = require('../../models/drop');

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
    var radius = droplifter.get('proximity_radius');
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
