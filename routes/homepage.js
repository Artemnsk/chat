module.exports = function (app, passport) {
    var express = require('express');
    //var regExp = require('custom_modules/regExp_param/regExp_param');
    var router = express.Router();

    //regExp.regExp_param(router);
    //router.param('par', /^\d+$/);

    router.get('/', function(req, res) {
        res.render('fileupload', {'info' : req.flash('info'), 'error' : req.flash('error'), 'user' : req.user});
    });
    //res.render('index', {'info' : req.flash('info'), 'error' : req.flash('error'), 'user' : req.user});

    return router;
};