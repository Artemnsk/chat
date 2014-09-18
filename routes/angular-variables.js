/*
 * /upload/* path.
 * Used for files upload.
 */
module.exports = function (app, passport) {
    var express = require('express');
    var router = express.Router();

    router.get('/user', passport.isLoggedIn, function (req, res) {
        res.json(req.user);
    });

    router.get('/data', passport.isLoggedIn, function (req, res) {
        res.json({'user_images_path' : "images/user_images"});
    });

    return router;
};