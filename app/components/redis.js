"use strict";

var config = require("config");
var redis = require("redis");
var redisClient = redis.createClient(config.redis.port, config.redis.host, {auth_pass: config.redis.password});

redisClient.auth(config.redis.password, function (err) {
    if (err) {
        console.log("redis error: " + err);
    } else {
        console.log("redis authenticated");
    }
});

redisClient.on("ready", function () {
    console.log("redis ready");
});


redisClient.on("connect", function () {
    console.log("redis connected");
});


redisClient.on("error", function (err) {
    console.log("redis error:  " + err);
});

exports.updateCache = function (key, value) {
    redisClient.set(key, JSON.stringify(value), function (redisError) {
        if (!redisError) {
            redisClient.expire(key, config.redis.ttl);
        } else {
            console.log(redisError);
        }
    });
};

exports.restoreFromCache = function (req, res, callback) {
    redisClient.get(req.url, function (redisError, reply) {
        if (!redisError && reply) {
            res.set("HP-Cache", true);
            res.set("Content-Type", "application/json; charset=utf-8");
            // Cached status code
            //res.status(304);
            res.send(decodeURIComponent(reply));
        } else {
            if (redisError) {
                console.log("redis cache error: " + redisError);
            }
            callback();
        }
    });
};

exports.delWildcard = function(key, callback){
    redisClient.keys(key, function(err, rows){
        rows.forEach(function(r){
            redisClient.del(r);
        });
        callback();
    });
};

exports.deleteKey = function(key, callback){
    redisClient.del(key);
    callback();
};
