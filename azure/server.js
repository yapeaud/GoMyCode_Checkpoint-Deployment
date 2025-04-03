let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
require('dotenv').config();

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('port', process.env.PORT || 5000);
console.log("+++++++++++++++" + app.get('port'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('../client/dist'));

app.use('/api/data', require('./routes/new-index.js'));

app.get("*", (req, res) => { //our GET route needs to point to the index.html in our build
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

app.listen(app.get('port'), function () {
    console.log(`Express server listening on port ${app.get('port')} - http://localhost:${app.get('port')}`);
});