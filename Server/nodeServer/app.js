var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/UserRoutes');
var areas = require('./routes/AreaRoutes');
var assigns = require('./routes/AssignRoutes');
var details = require('./routes/DetailsRoutes');
var locations = require('./routes/LocationsRoutes');
var modulelists = require('./routes/ModuleListRoutes');
var notifications = require('./routes/NotificationRoutes');
var orders = require('./routes/OrderRoutes');
var packagetypes = require('./routes/PackageTypeRoutes');
var permissionidlists = require('./routes/PermissionIdListRoutes');
var permissions = require('./routes/PermissionRoutes');
var permissiontypelists = require('./routes/PermissionTypeList');
var teamleads = require('./routes/TeamLeadRoutes');
var teamlists = require('./routes/TeamListRoutes');
var userteamlists = require('./routes/UserTeamListRoutes');

var app = express();

////////////
var url = 'mongodb://mshipper1:12345678@ds129090.mlab.com:29090/mshipper';

var multer = require('multer');

app.set('view engine', 'ejs');
app.set('views', './views');

var mongoose = require('mongoose');

mongoose.connect(url);
var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'connection error:'));
dbMongo.once('open', function () {
    console.log('MongoDb connect');
});

////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/areas', areas);
app.use('/assigns', assigns);
app.use('/details', details);
app.use('/locations', locations);
app.use('/modulelists', modulelists);
app.use('/notifications', notifications);
app.use('/packagetypes', packagetypes);
app.use('/orders', orders);
app.use('/permissionidlists', permissionidlists);
app.use('/permissions', permissions);
app.use('/permissiontypelists', permissiontypelists);
app.use('/teamleads', teamleads);
app.use('/teamlists', teamlists);
app.use('/userteamlists', userteamlists);

// catch 404 and forward to error handler
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

console.log("Concobebe");

app.listen(9999, function () {
    console.log('connect thanh cong');
});

module.exports = app;

