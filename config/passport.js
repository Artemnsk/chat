var LocalStrategy = require('passport-local').Strategy;
// load up the user model
var User = require('../models/user');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('error', 'That email is already taken.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('error', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('error', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });

        }));
/*
    passport.use('local-edit', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password_new',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password_new, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);
                    if(user){
                        if (user._id.id != req.user._id.id) {
                            return done(null, false, req.flash('error', 'You trying to edit foreign account!'));
                        }
                    }
                    if(req.body.password_new !== req.body.password_new_repeat){
                        return done(null, false, req.flash('error', 'Password should match!'));
                    }
                    if(!req.body.password_new || !req.body.email){
                        return done(null, false, req.flash('error', 'Please fill all fields!'));
                    }
                    // If all is OK.
                    req.user.local.email = email;
                    req.user.local.password = req.user.generateHash(password_new);

                    // File upload - photo.
                    var fs = require('fs');
                    // get the temporary location of the file
                    var tmp_path = req.files.photo.path;
                    // set where the file should actually exists - in this case it is in the "images" directory
                    var target_path = './public/images/user_images/' + req.user._id.id + req.files.photo.name;
                    // move the file from the temporary location to the intended location
                    fs.rename(tmp_path, target_path, function(err) {
                        if (err) throw err;
                        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                        fs.unlink(tmp_path, function() {
                            if (err) throw err;
                            req.user.photo = req.user._id.id + req.files.photo.name;
                        });
                    });


                    req.user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, req.user, req.flash('info', 'Data successfully changed!'));
                    });

                });
            });
        }));
*/
    // Check if user is logged in.
    passport.isLoggedIn = function(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        req.flash('error', 'Access denied. You need login or signup first to visit this page.')
        res.redirect('/');
    }
};