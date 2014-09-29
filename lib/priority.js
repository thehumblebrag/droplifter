// This method implements the maths for determining
// priority for a drop. IT IS NOT SCALEABLE.
// Make sure someone integrates it better with the
// rest of our code.

// Don't let this 'thing' stay as lib/priority.js either.
// It is terrible. Structure this stuff better.

// TODO: Calculate listening radius

// Constants
// We may want this in a constants file.
var BASE = 100;
var LIKES_MULTIPLIER = 0.5;
var DECAY_RATE = -0.07;
var NOW = new Date();

module.exports = hello = function () {
	return "hello";
};

module.exports = getPriority = function (drop) {
	return (BASE + (drop.score * LIKES_MULTIPLIER)) * Math.exp(DECAY_RATE * (NOW - drop.created_at));
};
