// Authentication using passportjs.
// Supporting Twitter, Facebook and G+ strategies.

var droplifter = require('../');
var passport = require('passport');
var config = require('../config');
var User = require('../models/user');
var FacebookTokenStrategy = require('passport-facebook-token').Strategy;
var TwitterTokenStrategy = require('passport-twitter-token').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

// User (de)serialization.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

if (droplifter.get('facebook_id')) {
    // Facebook
    passport.use(new FacebookTokenStrategy({
        clientID: config.facebook_id,
        clientSecret: config.facebook_secret
    },
    function(access_token, refresh_token, profile, done) {
        // Find or create user.
        User.findOne({
            external_id: profile.id,
            external_type: 'facebook'
        }, function (err, user) {
            if (err) {
                console.log('err', err);
                return done(err);
            }
            if (!user) {
                user = new User({
                    external_id: profile.id,
                    external_type: 'facebook'
                });
                return user.save(done);
            }
            done(null, user);
        });
    }));
}

if (droplifter.get('twitter_key')) {

    passport.use(new TwitterStrategy({
            consumerKey: config.twitter_key,
            consumerSecret: config.twitter_secret,
            callbackURL: config.url + '/auth/twitter/callback'
        },
        function(token, token_secret, profile, done) {
            User.findOne({
                external_id: profile.id,
                external_type: 'twitter'
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        name: profile.username,
                        location: profile.location,
                        external_id: profile.id,
                        external_type: 'twitter'
                    });
                    return user.save(done);
                }
                done(null, user);
            });
        }
    ));

    passport.use(new TwitterTokenStrategy({
        consumerKey: config.twitter_key,
        consumerSecret: config.twitter_secret,
        skipExtendedUserProfile: true
    },
    function (token, token_secret, profile, done) {
        User.findOne({
            external_id: profile.id,
            external_type: 'twitter'
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    name: profile.username,
                    location: profile.location,
                    external_id: profile.id,
                    external_type: 'twitter'
                });
                return user.save(done);
            }
            done(null, user);
        });
    }));

}
