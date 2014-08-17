var droplifter = require('../');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    avatar: String, // avatar
    phone: String,
    email: String,
    gender: String, // male|female
    location: String, // open field location (e.g. perth, western australis)
    external_type: String, // facebook|twitter|google+
    external_id: String, // external id for facebook, twitter, etc.
    created_at: Date,
    last_access_at: Date
});

var User = module.exports = exports = droplifter.model('User', schema);

User.TYPES = ['facebook', 'twitter', 'google+'];
User.GENDERS = ['male', 'female'];
