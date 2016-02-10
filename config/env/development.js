"use strict";

module.exports = {
    port: 8020,
    db: {
        uri: "mongodb://localhost/hp-cases-demo"
    },
    redis: {
        uri: "redis://192.168.30.213:6379",
        ttl: 20
    },
    imageServerUri: "http://localhost:8020/image"
};