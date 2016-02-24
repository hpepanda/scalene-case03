var mongoose = require("mongoose");
var ExpensesModel = mongoose.model("Expenses");
var ReportsModel = mongoose.model("Reports");
var moment = require("moment");

var getTotalReports = function(startDate, endDate) {
    return ReportsModel.count({date: {
        "$gte": startDate,
        "$lt": endDate
    }})
        .exec();
};

var getTotalExpenses = function(startDate, endDate) {
    return ExpensesModel.count({date: {
        "$gte": startDate,
        "$lt": endDate
    }})
        .exec();
};

var getTotalCategories = function(startDate, endDate) {
    return ExpensesModel.aggregate([{
        $match: {
            date: {
                "$gte": startDate,
                "$lt": endDate
            }
        }
    },
        { $group: { _id: '$category', count: {$sum: 1}}}]).exec();
};

var getTotalVendors = function(startDate, endDate) {
    return ExpensesModel.aggregate([
        {
            $match: {
                date: {
                    "$gte": startDate,
                    "$lt": endDate
                }
            }
        },
        { $group: { _id: '$vendor', count: {$sum: 1}}}]).exec();
};

var getTotalPersonal = function(startDate, endDate) {
    return ExpensesModel.count({date: {
        "$gte": startDate,
        "$lt": endDate
    }, "personal": "True"})
        .exec();
};

var getTotalUnassigned = function(startDate, endDate) {
    return ExpensesModel.count({date: {
        "$gte": startDate,
        "$lt": endDate
    }, "reportId": null})
        .exec();
};

var getTotalAmount = function(startDate, endDate) {
    return ExpensesModel.aggregate([{
        $match: {
            date: {
                "$gte": startDate,
                "$lt": endDate
            }
        }
    },
        {
            $group: {
                _id: 1,
                count: {$sum: "$amount"}
            }
        }
    ]).exec();
};

function formatCurrency(n, currency) {
    return n.toFixed(2).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        }) + " " + currency;
}


exports.getData = function(req, res, next) {
    var startDate = new Date(moment(req.query.from).startOf('day'));
    var endDate = new Date(moment(req.query.to).endOf('day'));
    var result = [];
    Promise.resolve().then(function () {
        return getTotalReports(startDate, endDate);
    }).then(function (reportsCount) {
        result.push({
            "Key": "Total reports",
            "Value": reportsCount
        });
    }).then(function () {
        return getTotalExpenses(startDate, endDate);
    }).then(function (expensesCount) {
        result.push({
            "Key": "Total expenses",
            "Value": expensesCount
        });
    }).then(function () {
        return getTotalCategories(startDate, endDate);
    }).then(function (categoriesCount) {
        result.push({
            "Key": "Categories",
            "Value": categoriesCount.length
        });
    }).then(function () {
        return getTotalVendors(startDate, endDate);
    }).then(function (vendorsCount) {
        result.push({
            "Key": "Vendors",
            "Value": vendorsCount.length
        });
    }).then(function () {
        return getTotalPersonal(startDate, endDate);
    }).then(function (personalCount) {
        result.push({
            "Key": "Personal",
            "Value": personalCount
        });
    }).then(function () {
        return getTotalUnassigned(startDate, endDate);
    }).then(function (unassignedCount) {
        result.push({
            "Key": "Unassigned",
            "Value": unassignedCount
        });
    }).then(function () {
        return getTotalAmount(startDate, endDate);
    }).then(function (totalAmount) {
        if(totalAmount.length > 0) {
            result.push({
                "Key": "Total amount",
                "Value": formatCurrency(totalAmount[0].count, "$")
            });
        } else {
            result.push({
                "Key": "Total amount",
                "Value": "0 $"
            });
        }
    }).then(function() {
        res.send(JSON.stringify(result));
    }).catch(function(err) {
        console.log(err);
        next(err);
    });
};


