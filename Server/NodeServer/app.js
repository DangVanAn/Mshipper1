var url = 'mongodb://mshipper1:12345678@ds129090.mlab.com:29090/mshipper';

var express = require('express');
var app = express();

var multer = require('multer');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.listen(9999, function () {
    console.log('connect thanh cong');
});

var User = require('./model/user');
var users = require('./routes/users');
var PermissionIdList = require('./model/permissionIdList');
var ModuleList = require('./model/moduleList');
var PermissionTypeList = require('./model/permissionTypeList');
var Permission = require('./model/permission');
var Locations = require('./model/locations');
var TeamList = require('./model/teamList');
var TeamLead = require('./model/teamLead');
var UsersTeamList = require('./model/usersTeamList');
var Devices = require('./model/devices');
var Orders = require('./model/orders');
var Notifications = require('./model/notifications');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
var mongoose = require('mongoose');

mongoose.connect(url);
var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'connection error:'));
dbMongo.once('open', function () {
    console.log('MongoDb connect');
});

app.use('/users', users);

app.post('/sent', function (req, res) {

    var newUser1 = new User(req.body);

    console.log(newUser1);
    console.log(req.body);

//     var newUser = User({
//         _id: '003',
//         _identify_card: '152130543',
//         _first_name: 'Hưng',
//         _last_name: 'Diệp Minh',
//         _email: 'diepminhhung14@gmail.com'
//     });
//
// // save the user
//     newUser.save(function (err) {
//         if (err)
//             return console.error(err);
//         else {
//             res.status(200).send('User created!');
//             console.log('User created!');
//         }
//     });
    res.status(200).send('User created!');
});


app.get('/getall', function (req, res) {

// get all the users
    User.find({}, function (err, users) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(users);
            console.log('Find all success!!!');
        }
    });
});

app.get('/getone', function (req, res) {

// get all the users
    User.find({_id: '001'}, function (err, users) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(users);
            console.log('Find one success!!!');
        }
    });
});

app.get('/getbyid', function (req, res) {

// get all the users
    User.findById(001, function (err, users) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(users);
            console.log('Find one success!!!');
        }
    });
});


app.get('/getupdate', function (req, res) {

// get all the users
    User.findOne({_id: '001'}).select().exec(function (err, user) {
        if (err)
            return console.error(err);
        else {

            //change
            user._email = 'bichphuongyeudau@gmail.com';

            //save again
            user.save(function(err) {
                if (err)
                    return console.error(err);
                else {
                    res.status(200).send(user);
                    console.log('User successfully updated!');
                }
            });
        }
    });
});

app.get('/getremoveone', function (req, res) {

// get all the users
    User.findOne({_id: '002'}).select().exec(function (err, user) {
        if (err)
            return console.error(err);
        else {

            //delete all
            user.remove(function(err) {
                if (err)
                    return console.error(err);
                else {
                    res.status(200).send(user);
                    console.log('User successfully remove!');
                }
            });
        }
    });
});

//4.2 model PERMISSION_ID_LIST start
app.get('/createPermissionIdList', function (req, res) {

    var newPermissionIdList = PermissionIdList({
        _permission_id: '003',
        _name: 'AN khùng',
    });

// save the newPermissionIdList
    newPermissionIdList.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('PermissionIdList created!');
            console.log('PermissionIdList created!');
        }
    });
});

//4.2 PERMISSION_ID_LIST end

//4.3 model MODULE_LIST start
app.get('/createModuleList', function (req, res) {

    var newModuleList = ModuleList({
        _module_id: '003',
        _name: 'AN khùng',
    });

    newModuleList.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('ModuleList created!');
            console.log('ModuleList created!');
        }
    });
});

//4.3 MODULE_LIST end
//4.4 model PermissionTypeList start
app.get('/createPermissionTypeList', function (req, res) {

    var newPermissionTypeList = PermissionTypeList({
        _permission_type_id: '003',
        _name: 'AN khùng',
    });

    newPermissionTypeList.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('PermissionTypeList created!');
            console.log('PermissionTypeList created!');
        }
    });
});

//4.4 PermissionTypeList end
//4.5 model Permission start
app.get('/createPermission', function (req, res) {

    var newPermission = Permission({
        _permission_id: '003',
        _module_id: 'AN khùng',
        _permission_type_id: 'abc',
    });

    newPermission.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Permission created!');
            console.log('Permission created!');
        }
    });
});

//4.5 Permission end
//4.6 model Locations start
app.get('/createLocations', function (req, res) {
    var currenttime = new Date();

    var newLocations = Locations({
        _id: '003',
        _latitude: '123',
        _longitude: '123',
        _timestamp: currenttime.getDate(),
        _delivery_man: 'AN khùng',
    });

    newLocations.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Locations created!');
            console.log('Locations created!');
        }
    });
});

//4.6 Locations end
//4.7 model TEAM_LIST start
app.get('/createTeamList', function (req, res) {

    var newTeamList = TeamList({
        _team_id : '003',
        _name: 'AN khùng',
        _area: 'AN khùng',
        _status: 'AN khùng',
        _description: 'AN khùng',

    });

    newTeamList.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('TeamList created!');
            console.log('TeamList created!');
        }
    });
});

//4.7 TEAM_LIST end
//4.8 model TEAM_LEAD start
app.get('/createTeamLead', function (req, res) {

    var newTeamLead = TeamLead({
        _team_id : '003',
        _team_lead: 'AN khùng',
        _manager: 'AN khùng',
    });

    newTeamLead.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('TeamLead created!');
            console.log('TeamLead created!');
        }
    });
});
//4.8 TEAM_LEAD end

//4.9 model  USERS_TEAM_LISTstart
app.get('/create', function (req, res) {

    var newUsersTeamList = UsersTeamList({
        _user_id : '003',
        _team_id: 'AN khùng',
    });

    newUsersTeamList.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('UsersTeamList created!');
            console.log('UsersTeamList created!');
        }
    });
});
//4.9 USERS_TEAM_LIST end

//4.10 model Devices start
app.get('/createDevices', function (req, res) {

    var newDevices = Devices({
        _id : '003',
        _delivery_man: 'AN khùng',
        _name: 'AN khùng',
        _Imei: 'AN khùng',
    });

    newDevices.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Devices created!');
            console.log('Devices created!');
        }
    });
});
//4.10 Devices end
//4.11 model Notifications start
app.get('/createNotifications', function (req, res) {

    var newNotifications = Notifications({
        _id : '003',
        _alert: 'AN khùng',
        _sender: 'AN khùng',
        _timestamp: new Date(),
        _seen: false,
        _confirmed: 1,
    });

    newNotifications.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Notifications created!');
            console.log('Notifications created!');
        }
    });
});
//4.11 Notifications end
