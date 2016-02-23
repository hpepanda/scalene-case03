var mongoose = require("mongoose");
var ExpensesModel = mongoose.model("Expenses");
var ReportsModel = mongoose.model("Reports");


var getTotalReports = function() {
    return ReportsModel.count({})
        .exec();
};

var getTotalExpenses = function() {
    return ExpensesModel.count({})
        .exec();
};

var getTotalCategories = function() {
    return ExpensesModel.aggregate({ $group: { _id: '$category', count: {$sum: 1}}}).exec();
};

var getTotalVendors = function() {
    return ExpensesModel.aggregate({ $group: { _id: '$vendor', count: {$sum: 1}}}).exec();
};

var getTotalPersonal = function() {
    return ExpensesModel.count({"personal": "True"})
        .exec();
};

var getTotalUnassigned = function() {
    return ExpensesModel.count({"reportId": null})
        .exec();
};

var getTotalAmount = function() {
    return ExpensesModel.aggregate({ $group: { _id: 1, count: {$sum: "$amount"}}}).exec();
};


exports.getData = function(req, res, next){
    var result = [];
    Promise.resolve().then(getTotalReports).then(function (reportsCount) {
        result.push({
            "Key": "Total reports",
            "Value": reportsCount
        });
    }).then(getTotalExpenses).then(function (expensesCount) {
        result.push({
            "Key": "Total expenses",
            "Value": expensesCount
        });
    }).then(getTotalCategories).then(function (categoriesCount) {
        result.push({
            "Key": "Categories",
            "Value": categoriesCount.length
        });
    }).then(getTotalVendors).then(function (vendorsCount) {
        result.push({
            "Key": "Vendors",
            "Value": vendorsCount.length
        });
    }).then(getTotalPersonal).then(function (personalCount) {
        result.push({
            "Key": "Personal",
            "Value": personalCount
        });
    }).then(getTotalUnassigned).then(function (unassignedCount) {
        result.push({
            "Key": "Unassigned",
            "Value": unassignedCount
        });
    }).then(getTotalAmount).then(function (totalAmount) {
        result.push({
            "Key": "Total amount",
            "Value": totalAmount[0].count + "$"
        });
    }).then(function() {
        res.send(JSON.stringify(result));
    }).catch(function(err) {
        console.log(err);
        next(err);
    });
};


