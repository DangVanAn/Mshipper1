var express = require('express');
var router = express.Router();
var User = require('../models/User');
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
const saltRounds = 10;
const keyJWT = 'djs235Ajhs668DDflb';

router.get('/getall', function (req, res) {
    User.find({}, function (err, users) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(users);
            console.log('Find all success!!!');
        }
    }).select('-_token -_hashed_password -_id');
});

router.post('/add', function (req, res) {

    User.findOne({
        _phone: req.body._phone
    }).select().exec(function (err, user) {
        if (err)
            return console.error(err);
        else {
            if (!user) {
                var newUser = new User(req.body);

                var time = new Date().getTime().toString();
                newUser._token = (jwt.sign({ bum: time + keyJWT, user: newUser._phone }, keyJWT) + ' ' + time).split(".")[2];

                bcrypt.hash('123456', 10, function (err, hash) {
                    newUser._hashed_password = hash;
                    newUser.save(function (err) {
                        if (err)
                            return console.error(err);
                        else {
                            res.status(200).send('User created!');
                            console.log('User created!');
                        }
                    });
                });
            }
            else {
                res.status(200).send("Số điện thoại đã tồn tại!");
            }


        }
    });
});

router.post('/update', function (req, res) {
    User.findOneAndUpdate({ _identify_card: req.body._identify_card }, req.body, function (err, user) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(user);
            console.log('User successfully updated!');
        }
    });
});

router.post('/getbyphone', function (req, res) {
    console.log(req.body);

    User.find({ _phone: req.body.phone }, function (err, user) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(user);
            console.log('Find one success!!!');
        }
    }).select('-_token -_hashed_password -_id');
});

router.post('/updatebyphone', function (req, res) {
    User.findOneAndUpdate({ _phone: req.body._phone }, req.body, function (err, user) {
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
        _phone: req.body._phone,
    }).select().exec(function (err, user) {
        if (err) {
            res.status(200).send({ success: false, message: "User not found" });
            return console.error(err);
        }
        else {
            if (!user)
                res.status(200).send({ success: false, message: "Phone is incorrect" });
            else {
                bcrypt.compare(req.body._password, user._hashed_password, function (err, resp) {
                    // res == true
                    if (resp == true) {
                        //user update _device_token
                        console.log(req.body)
                        if (!req.body._device_token) {
                            res.status(200).send({
                                success: false, message: "_device_token is empty", data: ""
                            });
                            return
                        }

                        user._device_token = req._device_token
                        user.save(function (err) {
                            if (err)
                            {
                                res.status(200).send({success: false, message: "Update _device_token Failed"});
                                return
                            }
                        });
                        var userRes = {
                            _phone: user._phone,
                            _permission_id: user._permission_id,
                            _identify_card: user._identify_card,
                            _name: user._name,
                            _token: user._token
                        };

                        res.status(200).send({
                            success: true, message: "OK", data: JSON.stringify(userRes)
                        });
                    }
                    else {
                        res.status(200).send({ success: false, message: "Password is incorrect" });
                    }
                });
            }
        }
    });

});

router.post('/updateDeviceToken', function (req, res) {
    User.findOne({
        _phone: req.body._phone,
    }).select().exec(function (err, user) {
        if (err) {
            res.status(200).send({ success: false, message: "User not found" });
            return console.error(err);
        }
        else {
            if (!user)
                res.status(200).send({ success: false, message: "Phone is incorrect" });
            else {
                user._device_token = req._device_token
                user.save(function (err, updatedUser) {
                    if (err) {
                        res.status(200).send({ success: false, message: "Update _device_token Failed" });
                        return
                    }
                });

                res.status(200).send({
                    success: true, message: "Update _device_token complete", data: ""
                });
            }
        }
    });
});


router.get('/me', ensureAuthorized, function (req, res) {
    User.findOne({ _token: req.token }, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

process.on('uncaughtException', function (err) {
    console.log(err);
});

module.exports = router;


