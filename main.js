var MongoClient = require("mongodb").MongoClient;
var replaceall  = require("replaceall");
//-------------------------------------------------------------
var expenses = require("./expenses.js");
var reports = require("./reports.js");
//-------------------------------------------------------------
var apiServerIP = process.argv[2] || "127.0.0.1:8082";
var mongoUrl    = process.argv[3] || "mongodb://localhost:27017/test";

MongoClient.connect(mongoUrl, function(err, db) {
    if (err){
        console.log("Error connecting to mongo: " + err);
    }
    else {
        importData(db);
        setTimeout(function() { db.close(); }, 10000);
    }
});

var importData = function(db){
    console.log("Connected to server: " + mongoUrl);

    reports.forEach(function(item){
        db.collection('reports').insertOne(item, function(err, res) {
            if (err) {
                console.log("Error (reports): " + err);
            }
        });
    });

    expenses.forEach(function(item){
        updateServerAddress(item);
        db.collection('expenses').insertOne(item, function(err, res) {
            if (err) {
                console.log("Error (expenses): " + err);
            }
        });
    });
};

var updateServerAddress = function(item){
    item.receipt = replaceall("{apiServerIP}", apiServerIP, item.receipt);
}