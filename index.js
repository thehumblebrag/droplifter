/**
 * Launch droplifter server application from provided confiration.
 * Script required `--config config.js` to be provided.
 * Each configuration file should be a nodejs module returning an
 * object of required configraution including:
 *
 * - port
 * - database
 */

var _ = require('underscore');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var config = require(path.join(__dirname, argv.config || 'config'));
var express = require('express');
var passport = require('passport');
var session = require('express-session');

var Droplifter = function (config) {
    this._config = _.extend({
        port: 3000,
        database: 'mongodb://localhost/droplifter'
    }, config);
    console.log('.');
    this.express = express();
};

Droplifter.prototype.get = function (prop) {
    if (prop in this._config) {
        return this._config[prop];
    }
    return null;
};

Droplifter.prototype.set = function (prop, value) {
    if (prop in this._config) {
        this._config[prop] = value;
    }
    else {
        console.error('That configuration value doesn\'t exist');
    }
};

Droplifter.prototype.drop = function () {
    this.express.use(session({
        secret: 'whateverbro',
        saveUninitialized: true,
        resave: true
    }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.routes = require('./routes');
    this.database = require('./lib/database');
    this.express.listen(process.env.PORT || this._config.port, function () {
        console.log('Wait for the drop.');
    });
};

var droplifter = module.exports = exports = new Droplifter(config);

droplifter.drop();

module.exports = droplifter;
