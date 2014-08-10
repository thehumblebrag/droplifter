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
    res.json([]);
};
