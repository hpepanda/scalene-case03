"use strict";

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var production = require('./env/production');

var defaults = {
    root: path.normalize(__dirname + '/..'),
};

if (process.env.VCAP_SERVICES) {
    var services = JSON.parse(process.env.VCAP_SERVICES);
    if (services) {
        if (services["mongodb"]) {
            services["mongodb"].forEach(function (entry) {
                if (entry.name === (process.env.STACKATO_APP_NAME + "-mongo-db")) {
                    defaults.db = {
                        uri: entry.credentials.uri
                    }
                }
            });
        }
        if (services["redis"]) {
            services["redis"].forEach(function (entry) {
                if (entry.name === (process.env.STACKATO_APP_NAME + "-redis-db")) {
                    defaults.redis = {
                        uri: entry.credentials.uri,
                        host: entry.credentials.host,
                        port: entry.credentials.port,
                        password: entry.credentials.password,
                        ttl: 20
                    };
                }
            });
        }
    }
}

module.exports = {
    development: extend(development, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];