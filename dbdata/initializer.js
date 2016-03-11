var MongoClient = require("mongodb").MongoClient;
var replaceall  = require("replaceall");
//-------------------------------------------------------------
var expenses = require("./expenses.js");
var reports = require("./reports.js");
//-------------------------------------------------------------

var initializer = function(){
    this.initializeDB = function(imageServerUri, mongoUrl) {
        MongoClient.connect(mongoUrl, function(err, db) {
            if (err){
                console.log("Error connecting to mongo: " + err);
            }
            else {
                importData(db, mongoUrl, imageServerUri);
                setTimeout(function() { db.close(); }, 10000);
            }
        });
    };

    var importData = function(db, mongoUrl, imageServerUri) {
        console.log("Connected to server: " + mongoUrl);

        reports.forEach(function (item) {
            db.collection('reports').insertOne(item, function (err, res) {
                if (err) {
                    console.log("Error (reports): " + err);
                }
            });
        });

        expenses.forEach(function (item) {
            updateServerAddress(item, imageServerUri);
            db.collection('expenses').insertOne(item, function (err, res) {
                if (err) {
                    console.log("Error (expenses): " + err);
                }
            });
        });
    };

    var updateServerAddress = function(item, imageServerUri){
        item.receipt = replaceall("{imageServerUri}", imageServerUri, item.receipt);
    }
};

module.exports = new initializer();