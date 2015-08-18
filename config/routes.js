"use strict";

var expenses = require("expensesController");
var reports = require("reportsController");
var objectStorage = require("objectStorageController");

module.exports = function (app) {

    /// test server connection
    app.get("/", function (req, res) {
        res.json({ message: "I'm working!" });
    });

    app.post("/expenses", expenses.create);
    app.get("/expenses", expenses.find);
    app.patch("/expenses", expenses.update);
    app.delete("/expenses", expenses.delete);

    app.post("/reports", reports.create);
    app.get("/reports", reports.find);
    app.get("/reports/getById", reports.findById);
    app.patch("/reports", reports.update);
    app.delete("/reports", reports.delete);


    app.post("/reports/assignExpenses", reports.assignExpenses);

    app.post("/image", objectStorage.uploadImage);
    app.post("/image64", objectStorage.uploadImageBase64);

    /// catch 404 and forwarding to error handler
    app.use(function (req, res) {
        res.status(404).send({ error: "not found" });
    });

    /// catch unhandled errors and forwarding to error handler
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.send({ error: err.message });
    });
}