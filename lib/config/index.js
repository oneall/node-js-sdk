'use strict';

function Config(cfg) {
    this.endpoint = cfg.endpoint;
    this.publickey = cfg.publickey;
    this.privatekey = cfg.privatekey;
}

module.exports = Config;
