/**
 * Created by ashemyakin on 2/10/2016.
 */
var server = "http://localhost:8020/image";
var request = require('request');
var path = require('path');
var fs = require('fs');

var generateUUID = function () {
    var d = Date.now();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

exports.uploadImage = function (req, res, next) {
    var buffer = req.files.image.data;
    var uuid = generateUUID();
    var filename = "./images/" + uuid;
    fs.writeFile(filename, buffer, 'binary', function(err){
        if (err) {
            console.log(err);
            next(new Error(err));
        }
        console.log('File saved.');
        res.status(201);
        res.send({ imageUri: server + "?file=" + uuid });
    })
};

exports.uploadImageBase64 = function (req, res, next) {
    var buffer = new Buffer(req.body.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    var uuid = generateUUID();
    var filename = "./images/" + uuid;
    fs.writeFile(filename, buffer, 'binary', function(err){
        if (err) {
            console.log(err);
            next(new Error(err));
        }
        console.log('File saved.');
        res.status(201);
        res.send({ imageUri: server + "?file=" + uuid });
    });
};

exports.getImage = function(req, res) {
    res.sendFile(req.query.file, { root: path.join(__dirname, '../../images') });
};