var mongoose = require('mongoose');
var droplifter = require('../');

mongoose.connect(droplifter.get('database'));
module.exports = mongoose;
