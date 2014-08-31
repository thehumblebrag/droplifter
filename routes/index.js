var passport = require('passport');
var droplifter = require('../');
var drop = require('./api/drop');
var user = require('./api/user');
var auth = require('./auth');
var authmw = require('./middleware/auth');

// Auth routes
// Facebook: The post request to this route should include a JSON object
// with the keys access_token and optionally, refresh_token set to the
// credentials you receive from facebook.
droplifter.express.get(
    '/auth/facebook/token',
    passport.authenticate('facebook-token'),
    function (req, res) {
        // Do something with User.
        if (req.user) {
            res.json({success: true, user: req.user});
        }
        else {
            res.json({success: false});
        }
    });

// Twitter
droplifter.express.get(
    '/auth/twitter/token',
    passport.authenticate('twitter-token'),
    function (req, res) {
        // do something with req.user
        if (req.user) {
            res.json({success: true, user: req.user});
        }
        else {
            res.json({success: false});
        }
    });

// Drop routes
droplifter.express.get('/drop', authmw.getUser, drop.get);
droplifter.express.get('/drop/:id', authmw.getUser, drop.find);
droplifter.express.get('/drop/location/:location',
                       authmw.getUser, drop.geoFind);

// User routes
droplifter.express.get('/user', authmw.getUser, user.get);
droplifter.express.get('/user/:id', authmw.getUser, user.find);
droplifter.express.get('/user/location/:location',
                       authmw.getUser, user.geoFind);
