var async = require('async');
var droplifter = require('../../');
var Drop = require('../../models/drop');
var priority = require('../../lib/priority'); // terrible

module.exports.test = function (req, res) {
    // TODO: check this script is usable
    // var myres = {
    //     "value": "hi"
    // }
    // res.json(myres);

    // TODO: get a bunch of drops, formatted nicely for testing
    Drop.find().exec(function (err, drops) {
        res.json(drops);
    });

// TODO: make sure the priority lib can be used
    
// TODO: make it say hello

// TODO: add priority score to each drop using priority lib

// TODO: check priority decay over time
}

module.exports.get = function (req, res) {
    if (req.query.location) {
        return geoFind(req, res);
    }
    Drop.find().limit(10).exec(function (err, drops) {
        if (err) {
            return res.json(502, { error: err });
        }
        res.json(drops);
    });
};

module.exports.create = function (req, res) {
    var drop = new Drop({
        user: req.user,
        text: req.body.text,
        location: [req.body.location.lng, req.body.location.lat],
        created_at: new Date()
    });
    drop.save(function (err, drop) {
        if (err) {
            console.log('error', err);
            return res.json({ success: false });
        }
        res.json({ success: true })
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

geoFind = module.exports.geoFind = function (req, res) {
    var latlng = req.query.location.split(',').map(Number).reverse();
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
                done(null, drop);
            });
        }, function (err, drops) {
            res.json(drops);
        });
    });
};
