var async = require('async');
var droplifter = require('../');
var Drop = droplifter.model('Drop');
var User = droplifter.model('User');

var USERS = {
    amelia: new User({
        name: 'Amelia',
        email: 'amelia@example.com',
        location: 'Perth, Western Australia',
        created_at: new Date(),
        last_access_at: new Date(),
        last_access_location: [138.960597, 34.476826]
    }),
    dave: new User({
        name: 'Dave',
        email: 'dave@example.com',
        phone: '0401333444',
        created_at: new Date()
    }),
    joonda: new User({
        name: 'Joonda',
        email: 'joonda@example.com',
        created_at: new Date()
    }),
    maurice: new User({
        name: 'Maurice',
        email: 'maurice@example.com',
        created_at: new Date()
    }),
    ronda: new User({
        name: 'Ronda',
        email: 'ronda@example.com',
        last_access_at: new Date(),
        last_access_location: [115.849436, -31.946555],
        created_at: new Date()
    })
};

var DROPS = [
    {
        user: USERS.amelia,
        text: 'Yay, phone signal! Just up here and the sun is settng - beaut spot! Although if you squint, the hills form a bum shape :)',
        location: [138.960597, 34.476826],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.joonda,
        text: 'Bar Sixsmith is sweet, nice atmos and not too crowded - having a blast!',
        location: [138.960597, 34.476826],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.dave,
        text: '@Joonda that so? Sounds awesome! At bar whisky right now - overpriced and crowded. May bounce and try Sixsmith!',
        location: [138.960597, 34.476826],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.amelia,
        text: 'This line is shit, and my cons aren\'t gonna get in. Fuck this I\'m out',
        location: [138.960597, 34.476826],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.dave,
        text: '@Joonda second thoughts may stay here and order another pricey beer - wearing trainers!',
        location: [138.960597, 34.476826],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.ronda,
        text: 'Just bought a sweet dress from Sussan and ready to part-ay. Who wants to make plans with me?',
        location: [115.849436, -31.946555],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.maurice,
        text: '@Ronda would like to see that dress in person. Where you at?',
        location: [115.849436, -31.946555],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.ronda,
        text: '@Maurice downing a sweet burger right now; come find me',
        location: [115.849436, -31.946555],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.maurice,
        text: '@Ronda will do, hang on lemme just slip on my sweet white 501s',
        location: [115.849436, -31.946555],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.ronda,
        text: 'Can\'t wait to meet you @Maurice, have those got the stretch gusset?',
        location: [115.849436, -31.946555],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.maurice,
        text: 'Shit yeah @Ronda, I look good *and* am ready to protect you should trouble come a-knocking',
        location: [115.849436, -31.946555],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.ronda,
        text: '@Maurice you can be my Chuck Norris',
        location: [115.849436, -31.946555],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.maurice,
        text: 'Gimme 5 @Ronda',
        location: [115.849436, -31.946555],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.maurice,
        text: '@Ronda where you at. I\'m looking about in bunpatties and can\'t see you',
        location: [115.849436, -31.946555],
        score: 0,
        created_at: new Date()
    },
    {
        user: USERS.maurice,
        text: '@Ronda? @Ronda? Shit',
        location: [115.849436, -31.946555],
        score: 0,
        created_at: new Date()
    }
];

var insertDrop = function (drop, callback) {
    return Drop.create(drop, callback);
};

async.each(Object.keys(USERS), function (user, done) {
    USERS[user].save(done);
}, function (err) {
    async.map(DROPS, insertDrop, function (err, drops) {
        if (err) {
            console.error(err);
        }
        console.log('Import complete. %d drops added', drops.length);
        process.exit();
    });
});
