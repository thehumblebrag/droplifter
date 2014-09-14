var passport = require('passport');
var droplifter = require('../');
var authmw = require('./middleware/auth');
var drop = require('./api/drop');
var user = require('./api/user');
var auth = require('./auth');
var admin = require('./admin');

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
            res.json({ success: true, user: req.user });
        }
        else {
            res.json({ success: false });
        }
    });

// Twitter
droplifter.express.get(
    '/auth/twitter/token',
    passport.authenticate('twitter-token'),
    function (req, res) {
        if (req.user) {
            res.json({ success: true, user: req.user });
        }
        else {
            res.json({ success: false });
        }
    });

droplifter.express.get('/auth/twitter', passport.authenticate('twitter'));
droplifter.express.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/admin/chat',
        failureRedirect: '/login'
    })
);

// Drop routes
droplifter.express.get('/drop', authmw.getToken, drop.get);
droplifter.express.get('/drop/:id', authmw.getToken, drop.find);
droplifter.express.post('/drop', authmw.getToken, drop.create);

// User routes
droplifter.express.get('/user', authmw.getToken, user.get);
droplifter.express.get('/user/me', authmw.requireUser, user.me);
droplifter.express.get('/user/:id', authmw.getToken, user.find);
droplifter.express.get('/user/location/:location',
                       authmw.getToken, user.geoFind);

// Admin routes
droplifter.express.get('/admin/chat', authmw.requireUser, authmw.requireAdmin, admin.chat);
droplifter.express.get('/admin/login', admin.login);
