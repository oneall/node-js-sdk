'use strict';

var connection = require('./lib/connection'),
    identity = require('./lib/identity'),
    sharingMessage = require('./lib/sharingMessage'),
    shorturl = require('./lib/shorturl'),
    user = require('./lib/user'),
    sso = require('./lib/sso'),
    analytics = require('./lib/analytics'),
    provider = require('./lib/provider'),
    Api = require('./lib/core/api'),
    Config = require('./lib/config');

/**
 * Oneall sdk, agregates all functions provided by Oneall rest API
 * @param {Object} options Connection properties, and some other options {api: {endpoint:..., publickey:..., privatekey:...}, debug:false};
 */
function Oneall(cfg) {

    var objects = [
        'connection',
        'identity',
        'sharingMessage',
        'shorturl',
        'user',
        'sso',
        'analytics',
        'provider'
    ];

    if (cfg === undefined) {
        throw new Error('cfg parameter is mandatory.');
    }

    if (cfg.endpoint === undefined) {
        throw new Error('You must set a endpoint.');
    }

    if (cfg.publickey === undefined) {
        throw new Error('You must set the publickey.');
    }

    if (cfg.privatekey === undefined) {
        throw new Error('You must set the privatekey.');
    }

    var config = new Config(cfg);
    this.api = new Api(config);


    objects.forEach (function (obj) {
        Object.keys(this[obj]).forEach(function (key) {
            this[obj][key] = this[obj][key].bind(this);
        }, this);
    }, this);

}

Oneall.prototype.connection = connection;
Oneall.prototype.sharingMessage = sharingMessage;
Oneall.prototype.shorturl = shorturl;
Oneall.prototype.user = user;
Oneall.prototype.identity = identity;
Oneall.prototype.sso = sso;
Oneall.prototype.analytics = analytics;
Oneall.prototype.provider = provider;

module.exports = Oneall;
