// app.js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var locations = require('./routes/LocationsRoutes');

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

var url = 'mongodb://mshipper1:12345678@ds129090.mlab.com:29090/mshipper';
var multer = require('multer');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(url);
var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'connection error:'));
dbMongo.once('open', function () {
    console.log('MongoDb connect ' + process.env.PORT);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/locations', locations);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

repHttp = function (success, message) {
    return {success: success, message: message};
};

var Locations = require('./models/Locations');
io.on('connection', function (client) {
    console.log('Client connected...');
    client.emit('messages', "Connected");

    client.on('messages', function (data) {
        locations.saveLocation(data);
    });
});

// server.listen(process.env.PORT || 6969);
server.listen(process.env.PORT || 6969, function() {
    console.log("------------server gps on-------------");
  });
//port express
// app.listen(1111, function () {
//     console.log('connect thanh cong');
// });

// module.exports = app;