"use strict";

var ip = require("ip");
var config = require("config");

exports.getAddress = function (req, res, next) {
    res.set('HP-Server', ip.address() + ":" + config.port);
    next();
};