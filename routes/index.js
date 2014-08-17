var droplifter = require('../');
var drop = require('./api/drop');
var user = require('./api/user');

// Auth routes

// Drop routes
droplifter.express.get('/drop', drop.get);
droplifter.express.get('/drop/:id', drop.find);
droplifter.express.get('/drop/location/:location', drop.geoFind);

// User routes
droplifter.express.get('/user', user.get);
droplifter.express.get('/user/:id', user.find);
