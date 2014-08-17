var droplifter = require('../');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    text: String,
    location: {
        type: [Number],
        index: '2dsphere'
    },
    score: {
        type: Number,
        select: false
    },
    created_at: Date
});

var Drop = module.exports = exports = droplifter.model('Drop', schema);
