var async = require('async');
var droplifter = require('../');
var Drop = droplifter.model('Drop');
var User = droplifter.model('User');

var USERS = {
    amelia: new User({
        name: "Amelia",
        email: "amelia@example.com",
        gender: "female",
        created_at: new Date()
    }),
    dave: new User({
        name: "Dave",
        email: "dave@example.com",
        gender: "male",
        created_at: new Date()
    }),
    joonda: new User({
        name: "Joonda",
        email: "joonda@example.com",
        gender: "female",
        created_at: new Date()
    })
};

var DROPS = [
    {
        user: USERS.amelia,
        text: "Yay, phone signal! Just up here and the sun is settng - beaut spot! Although if you squint, the hills form a bum shape :)",
        location: [138.960597, 34.476826],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.joonda,
        text: "Bar Sixsmith is sweet, nice atmos and not too crowded - having a blast!",
        location: [138.960597, 34.476826],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.dave,
        text: "@Joonda that so? Sounds awesome! At bar whisky right now - overpriced and crowded. May bounce and try Sixsmith!",
        location: [138.960597, 34.476826],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.amelia,
        text: "This line is shit, and my cons aren't gonna get in. Fuck this I'm out",
        location: [138.960597, 34.476826],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.dave,
        text: "@Joonda second thoughts may stay here and order another pricey beer - wearing trainers!",
        location: [138.960597, 34.476826],
        score: 0,
        created_at: new Date()
    }
];

var insertDrop = function (drop, callback) {
    return Drop.create(drop, callback);
};

async.map(DROPS, insertDrop, function (err, drops) {
    if (err) {
        console.error(err);
    }
    console.log('Import complete. %d drops added', drops.length);
    process.exit();
});
