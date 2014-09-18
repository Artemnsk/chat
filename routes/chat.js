/*
 * /upload/* path.
 * Used for files upload.
 */
module.exports = function (app, passport) {
    var express = require('express');
    var router = express.Router();
    var fs = require('fs');
    var busboy = require('connect-busboy');

    router.use('/', busboy());

    // Images upload.
    router.get('/', function (req, res) {
        res.render('chat', {'error' : req.flash('error')});
    });

    return router;
};