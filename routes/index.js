var drop = require('./api/drop');
var user = require('./api/user');

module.exports = function (app) {
    // drops
    app.get('/drop', drop.get);
    app.get('/drop/:id', drop.find);
    app.get('/drop/location/:location', drop.geoFind);
    // // users
    app.get('/user', user.get);
    app.get('/user/:id', user.find);
    app.get('/user/location/:location', user.geoFind);
};
