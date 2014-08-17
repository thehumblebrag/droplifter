var mongoose = require('../lib/database');

var TYPES = ['facebook', 'twitter', 'google+'];
var GENDERS = ['male', 'female'];

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
	created_access_at: Date
});

var User = mongoose.model('User', schema);

module.exports = User;
