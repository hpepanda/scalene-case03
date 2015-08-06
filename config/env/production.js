"use strict";

module.exports = {
    port: process.env.PORT,
    db: {
        uri: process.env.MONGODB_URL
    },
    redis: {
        uri: process.env.REDIS_URL,
        ttl: 20
    }
};