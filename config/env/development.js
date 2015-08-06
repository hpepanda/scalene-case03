"use strict";

module.exports = {
    port: 8081,
    db: {
        uri: "mongodb://192.168.30.213/hp-demo"
    },
    redis: {
        uri: "redis://192.168.30.213:6379",
        ttl: 20
    }
};