module.exports = function(app, passport){
    var flash = require('connect-flash');
    app.use(flash());

    app.use('/angular/variables', require('./angular-variables')(app, passport));

    app.use('/', require('./homepage')(app, passport));
    app.use('/user', require('./user')(app, passport));
    app.use('/upload/', require('./upload')(app, passport));
    app.use('/chat/', require('./chat')(app, passport));
};