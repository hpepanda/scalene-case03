var express = require('express');
var app = express();

if (process.env.SERVER_URI) {
    app.get('/app.settings.js', function (req, res) {
        res.set('Content-Type', 'application/javascript');
        var result =
            "var app = angular.module('hpsa-client');" +
            "app.constant('AppSettings', {" +
                "apiUrl: '" + process.env.SERVER_URI + "'," +
            "});";

        res.send(result);
    });
}

app.use(express.static(__dirname + '/app'));


app.listen(process.env.PORT || 8080);