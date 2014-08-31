// Authentication using passportjs.
// Supporting Twitter, Facebook and G+ strategies.

var passport = require('passport');
var config = require('../config');
var User = require('../models/user');
var FacebookTokenStrategy = require('passport-facebook-token').Strategy;
var TwitterTokenStrategy = require('passport-twitter-token').Strategy;

// User (de)serialization.
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Facebook
passport.use(new FacebookTokenStrategy({
    clientID: config.facebook_id,
    clientSecret: config.facebook_secret
},
function(accessToken, refreshToken, profile, done) {
    // Find or create user.
    User.findOne({
        external_id: profile.id,
        external_type: 'facebook'
    }, function (err, user) {
        if (err) {
            console.log('err: ' + err);
            return done(err);
        }
        if (!user) {
            console.log('Creating new user with FB ID: ' + profile.id);
            user = new User({
                external_id: profile.id,
                external_type: 'facebook'
            });
            return user.save(done);
        }
        done(null, user);
    });
}));

// Twitter
passport.use(new TwitterTokenStrategy({
    consumerKey: config.twitter_key,
    consumerSecret: config.twitter_secret,
    skipExtendedUserProfile: true
},
function(token, tokenSecret, profile, done) {
    // Find or create user.
    User.findOne({
        external_id: profile.id,
        external_type: 'twitter'
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            user = new User({
                external_id: profile.id,
                external_type: 'twitter'
            });
            return user.save(done);
        }
        done(null, user);
    });
}));
