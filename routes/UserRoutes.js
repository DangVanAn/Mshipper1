var express = require('express');
var router = express.Router();
var User = require('../models/User');
var md5 = require('md5');

router.get('/getall', function (req, res) {
    User.find({}, function (err, users) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(users);
            console.log('Find all success!!!');
        }
    });
});

router.post('/add', function (req, res) {

    User.findOne({_email: req.body._email
    }).select().exec(function (err, user) {
        if (err)
            return console.error(err);
        else {
            if (!user) {
                var newUser = new User(req.body);
                newUser.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send('User created!');
                        console.log('User created!');
                    }});
            }
            else
            {
                res.status(200).send("Email đã tồn tại, vui vòng điền email khác!");
            }


        }
    });
});

router.post('/update', function (req, res) {
    User.findOneAndUpdate({_identify_card: req.body._identify_card}, req.body, function (err, user) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(user);
            console.log('User successfully updated!');
        }
    });
});

router.post('/getbyemail', function (req, res) {
    console.log(req.body);

    User.find({_email: req.body.email}, function (err, user) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(user);
            console.log('Find one success!!!');
        }
    });
});

router.post('/updatebyemail', function (req, res) {
    User.findOneAndUpdate({_email: req.body._email}, req.body, function (err, user) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('User successfully updated!');
            console.log('User successfully updated!');
        }
    });
});

router.post('/login', function (req, res) {

    User.findOne({
        _email: req.body.email,
        _hashed_password: md5(req.body.password)
    }).select().exec(function (err, user) {
        if (err)
            return console.error(err);
        else {
            if (!user)
                res.status(200).send({success: false, message: "Username or password is incorrect"});
            else
                res.status(200).send({
                    success: true,
                    _is_enabled: user._is_enabled,
                    _permission_id: user._permission_id,
                    _identify_card: user._identify_card,
                    _first_name: user._first_name,
                    _last_name: user._last_name,
                });
        }
    });

});
module.exports = router;


