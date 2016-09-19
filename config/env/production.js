"use strict";
var path = require('path');

module.exports = {
    port: process.env.PORT || 80,
    db: {
        uri: process.env.MONGODB_URL || "mongodb://localhost/hp-cases-demo"
    },
    redis: {
        uri: process.env.REDIS_URL || "redis://192.168.30.213:6379",
        ttl: 20
    },
    imageServerUri: process.env.IMAGE_SERVER_URL || "http://localhost:8020/image",
    storageRootDir: process.env.HELION_FILESYSTEM ||  path.normalize(__dirname)
};