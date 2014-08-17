var mongoose = require('../lib/database');

var schema = new mongoose.Schema({
    text: String,
    location: {
        type: [Number],
        index: '2dsphere'
    },
    score: Number,
    created_at: Date
});

var Drop = mongoose.model('Drop', schema);

module.exports = Drop;
