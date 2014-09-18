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
    router.post('/image', /*passport.isLoggedIn,*/ function (req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            fstream = fs.createWriteStream('./chat/public/images/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                setInterval(function(){res.redirect('back');}, 5000);
            });
        });
    });

    return router;
};