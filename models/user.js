var droplifter = require('../');
var mongoose = require('mongoose');
var uuid = require('node-uuid');

AUTH_TYPES = ['facebook', 'twitter', 'google+'];
GENDERS = ['male', 'female'];

var schema = new mongoose.Schema({
    name: String,
    location: String,
    admin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: function() {
            return uuid.v4().replace(/-/g, '');
        }
    },
    external_type: {
        type: String,
        select: false,
        enum: AUTH_TYPES
    },
    external_id: {
        type: String,
        select: false
    },
    created_at: {
        type: String,
        select: false
    },
    last_access_at: {
        type: String,
        select: false
    },
    last_access_location: {
        type: [Number],
        index: '2dsphere'
    }
});

var User = module.exports = exports = droplifter.model('User', schema);
