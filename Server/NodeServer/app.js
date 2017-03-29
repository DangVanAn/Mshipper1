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
