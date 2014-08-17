/**
 * Launch droplifter server application from provided confiration.
 * Script required `--config config.js` to be provided.
 * Each configuration file should be a nodejs module returning an
 * object of required configraution including:
 *
 * - port
 */

var argv = require('minimist')(process.argv.slice(2));
var express = require('express');
var config = require('./config');
var app = express();

app.set('config', config);

var routes = require('./routes')(app);

app.listen(process.env.PORT || config.port, function () {
    console.log('Wait for the drop.');
});
