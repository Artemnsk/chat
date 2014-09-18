/*
 * /user/* path.
 */

module.exports = function(app, passport){
    var express = require('express');
    var router = express.Router();

    router.get('/login', function(req, res) {
        res.render('login', {'error' : req.flash('error')});
    });

    // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : 'back', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the edit profile form
    router.post('/profile/edit', passport.isLoggedIn, function(req, res){
        var formidable = require('formidable');
        var util = require('util');
        var User = require('models/user');
        var fs = require('fs');

        var form = new formidable.IncomingForm({ uploadDir: './uploads' });

        form.parse(req, function(err, fields, files) {
            var email = fields.email,
                password_new = fields.password_new,
                password_new_repeat = fields.password_new_repeat;

            // User fields validation goes here.
            process.nextTick(function() {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);
                    if(user){
                        if (user._id.id != req.user._id.id) {
                            return done(null, false, req.flash('error', 'You trying to edit foreign account!'));
                        }
                    }
                    if(password_new !== password_new_repeat){
                        return done(null, false, req.flash('error', 'Password should match!'));
                    }
                    if(!password_new || !email){
                        return done(null, false, req.flash('error', 'Please fill all fields!'));
                    }
                    // If all is OK.
                    req.user.local.email = email;
                    req.user.local.password = req.user.generateHash(password_new);

                    // File upload - photo.
                    if(files.photo.size){
                        var photo = files.photo;
                        var stream = fs.createReadStream(photo.path).pipe(fs.createWriteStream('./public/images/user_images/' + photo.name));
                        req.user.photo = photo.name;
                        stream.on("finish", function(){
                            fs.unlink(photo.path, function (err) {
                                if (err) throw err;
                            });
                        });
                    }

                    req.user.save(function(err) {
                        if (err)
                            throw err;
                        res.redirect('back');
                    });

                });
            });
        });

        return;
    });


    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/signup', function(req, res) {
        res.render('signup', {'error' : req.flash('error')});
    });

    // process the signup form
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/user/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    router.get('/profile', passport.isLoggedIn, function(req, res) {
        res.render('profile', {'user' : req.user});
    });

    return router;
};