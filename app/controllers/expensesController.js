"use strict";

var mongoose = require("mongoose");
var ExpensesModel = mongoose.model("Expenses");
var redis = require("../components/redis");
var paging = require("../components/paging");

/**
 * Create a new expense
 */
exports.create = function (req, res, next) {
    var expense = new ExpensesModel({
        category: req.body.category,
        vendor: req.body.vendor,
        amount: req.body.amount,
        receipt: req.body.receipt,
        personal: req.body.personal,
        date: req.body.date
    });

    expense.save(function (err) {
        if (!err) {
            redis.delWildcard("/expenses*", function(){
                res.send(expense);
            });
        } else {
            next(new Error(err));
        }
    });
};

/**
 * Find expenses
 */
exports.find = function (req, res, next) {
    redis.restoreFromCache(req, res, function () {
        var pagingParams = paging.parseParameters(req);
        var filter = parseFindInputParameters(req.query);
        ExpensesModel.count(filter, function (err, totalCount) {
            if (!err) {
                ExpensesModel.find(filter).sort({"date": -1}).skip(pagingParams.skip).limit(pagingParams.count).exec(function (err, expenses) {
                    if (!err) {
                        var expenses = expenses.map(function(expense){
                           return expense.toClient();
                        });

                        var expensesResponse = {
                            totalCount: totalCount,
                            content: expenses
                        };

                        res.send(expensesResponse);
                        redis.updateCache(req.url, expensesResponse);
                    } else {
                        console.log(err);
                        next(new Error(err));
                    }
                });
            } else {
                next(new Error(err));
            }
        });
    });
};

var parseFindInputParameters = function (reqQuery) {
    var filter = {};
    var fromDate = Date.parse(reqQuery.from);
    var toDate = Date.parse(reqQuery.to);
    if (!isNaN(fromDate) && !isNaN(toDate) && fromDate < toDate) {
        filter.date = {"$gte": fromDate, "$lt": toDate}
    }

    if (reqQuery.category) {
        filter.category = reqQuery.category;
    }

    filter.reportId = reqQuery.reportId || {$exists: false};

    return filter;
};


/**
 * update expense
 */
exports.update = function (req, res, next) {
    ExpensesModel.findByIdAndUpdate(req.body.expenseId,
        {
            $set: {
                category: req.body.category,
                vendor: req.body.vendor,
                amount: req.body.amount,
                receipt: req.body.receipt,
                personal: req.body.personal,
                date: req.body.date
            }
        }, {runValidators: true}, function (err) {
            if (!err) {
                res.status(204);
                res.send();
            } else {
                next(new Error(err));
            }
        });
};

var remove = function (id, callback) {
    ExpensesModel.find({ _id: id })
        .remove(function(err){
            callback(err, "Expense removed: " + id);
        });
};

var removeAll = function(callback){
    ExpensesModel.remove({}, function(err){
        callback(err, "Expenses collection removed");
    });
};

exports.preload = function(req, res, next) {
    ExpensesModel.find({})
        .remove(function(err){
            if(!err) {
                console.log("removed");
                var items = [
                    {"category":"Misc",   "vendor":"Seattle's Best","amount":284.87,"receipt":"imageServerUri?file=56bc8e24782ec3a82ab891bf","date": new Date("2016-09-18T16:20:36.000Z")}
                    ,{"category":"Airfare","vendor":"American Airlines","amount":914.15,"receipt":"imageServerUri?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-17T16:21:20.000Z")}
                    ,{"category":"Meal",   "vendor":"Starbucks Coffee","amount":8.5,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-18T16:21:59.000Z")}
                    ,{"category":"Meal",   "vendor":"Silver Cloud Inn","amount":75.8,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-16T16:22:37.000Z")}
                    ,{"category":"Taxi",   "vendor":"Seattle Limo","amount":125,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-18T16:23:04.000Z")}
                    ,{"category":"Misc",   "vendor":"Cypher Inc.","amount":269.68,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-16T15:21:46.000Z")}
                    ,{"category":"Misc",   "vendor":"Dozer Management","amount":397.87,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-17T15:22:11.000Z")}
                    ,{"category":"Meal",   "vendor":"El Uno Restaurante","amount":274.54,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-17T16:27:55.000Z")}
                    ,{"category":"Airfare","vendor":"Nebuchadnexxar Expresses Air","amount":940.97,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-18T16:26:38.000Z")}
                    ,{"category":"Misc",   "vendor":"Apoc Machines","amount":24.54,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-15T16:25:25.000Z")}
                    ,{"category":"Hotel",  "vendor":"Trinity Hotel","amount":101.01,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-16T16:29:53.000Z")}
                    ,{"category":"Meal",   "vendor":"Oracle Cookies","amount":4.13,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-18T16:27:15.000Z")}
                    ,{"category":"Misc",   "vendor":"Sentinel Systems","amount":556.45,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-16T16:26:40.000Z")}
                    ,{"category":"Misc",   "vendor":"Smith Agency","amount":91.93,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-17T16:21:20.000Z")}
                    ,{"category":"Misc",   "vendor":"Mouse","amount":189.34,"receipt":"imageServerUri/image?file=56bc8e24782ec3a82ab891bf","date":new Date("2016-09-18T16:31:49.000Z")}
                ];

                ExpensesModel.collection.insert(items, function onInsert(err, docs) {
                    if (err) {
                        next(new Error(err));
                    } else {
                        res.status(204);
                        res.send();
                    }
                });
            }
            else {
                next(new Error(err))
            }
        });
};

exports.delete = function(req, res, next){

   var callback = function(err, msg){
       if (!err) {
           console.log(msg);
           res.status(204);
           res.send();
       } else {
           next(new Error(err));
       }
   };

    if(req.query.id){
        remove(req.query.id, callback);
    }
    else{
        removeAll(callback);
    }
};