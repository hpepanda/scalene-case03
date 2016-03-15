"use strict";

var use = require('use-import').load();
var config = use("config");
var initializer = require("./dbdata/initializer");

console.log("DB init configuration: " + JSON.stringify(config));
console.log("Initializing db if environment variables set");
if (config.imageServerUri && config.imageServerUri.length > 0) {
    initializer.initializeDB(config.imageServerUri, config.db.uri);
}
else {
    console.log("Skipping init as IMAGE_SERVER_URL is not set");
}