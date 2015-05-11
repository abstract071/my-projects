'use strict';
var express = require('express');
var multer = require('multer');
var app = express();
var appPort = 3000;

app.use(express.static(__dirname + '/public', {
    etag: false,
    lastModified: false
}));
app.use('/uploads', express.static(__dirname + '/uploads', {
    etag: false,
    lastModified: false
}));

app.use(multer({dest: './uploads/'}));

app.use('/upload', function (req, res) {
    var files = req.files['files[]'];
    var filenames = [];
    if (!Array.isArray(files)) {
        files = [files];
    }
    files.forEach(function(file) {
        filenames.push('uploads/' + file.name);
    });
    res.json({files: filenames});
});

app.listen(appPort, function () {
    console.log('Site available on http://localhost:' + appPort);
});