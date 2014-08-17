var droplifter = require('../');
var mongoose = require('mongoose');

AUTH_TYPES = ['facebook', 'twitter', 'google+'];
GENDERS = ['male', 'female'];

var schema = new mongoose.Schema({
    name: String,
    avatar: String, // avatar
    phone: {
        type: String,
        select: false
    },
    email: {
        type: String,
        select: false
    },
    gender: {
        type: String,
        select: false,
        enum: GENDERS
    },
    location: String,
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
