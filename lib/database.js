var mongoose = require('mongoose');

module.exports = exports = function (url) {
    mongoose.connect(url);
    return mongoose;
};
