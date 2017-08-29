var express = require('express');
var router = express.Router();
var User = require('../models/User');
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
const saltRounds = 10;
const keyJWT = 'djs235Ajhs668DDflb';

router.get('/getall', function (req, res) {
    User.find({_is_enabled : true}, function (err, users) {
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
                newUser._token = (jwt.sign({
                    bum: time + keyJWT,
                    user: newUser._phone
                }, keyJWT) + ' ' + time).split(".")[2];

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

router.post('/adds', function (req, res) {

    // console.log(req.body);
    var listData = req.body;
    console.log(listData.length);

    var index = 0;
    var listPhoneExist = '';

    createAccouts(index);

    function createAccouts(index) {
        User.findOne({_phone: listData[index]._phone
        }).select().exec(function (err, user) {
            if (err)
                return console.error(err);
            else {
                if (!user) {
                    var newUser = new User(listData[index]);

                    var time = new Date().getTime().toString();
                    newUser._token = (jwt.sign({bum: time + keyJWT, user: newUser._phone}, keyJWT) + ' ' + time).split(".")[2];

                    bcrypt.hash('123456', 10, function(err, hash) {
                        newUser._hashed_password = hash;
                        newUser.save(function (err) {
                            if (err)
                                return console.error(err);
                            else {
                                console.log('85');
                                index++;
                                if(index < listData.length)
                                {
                                    createAccouts(index);
                                }
                                else {
                                    if(listPhoneExist.length > 0)
                                    {
                                        res.status(200).send('Số điện thoại:' +listPhoneExist + ' Đã tồn tại');
                                    }
                                    else{
                                        res.status(200).send('User created!');
                                        console.log('User created!');
                                    }
                                }
                            }});
                    });
                }
                else
                {
                    listPhoneExist += ' ' + listData[index]._phone;
                }
            }
        });
    }

    if(listPhoneExist.length > 0)
    {
        res.status(200).send('Số điện thoại:' +listPhoneExist + ' Đã tồn tại');
    }
});

router.post('/remove', function (req, res) {

    User.findOne({
        _phone: req.body._phone
    }).select().exec(function (err, user) {
        if (err)
            return console.error(err);
        else {
            if (user) {
                user._is_enabled = false;

                user.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send('User removed!');
                        console.log('User removed!');
                    }
                });
            }
            else {
                res.status(200).send("Tài khoản không tồn tại!");
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

router.post('/getbyphone', function (req, res) {
    console.log(req.body);

    User.find({_phone: req.body.phone}, function (err, user) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(user);
            console.log('Find one success!!!');
        }
    }).select('-_token -_hashed_password -_id');
});

router.post('/updatebyphone', function (req, res) {
    User.findOneAndUpdate({_phone: req.body._phone}, req.body, function (err, user) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('User successfully updated!');
            console.log('User successfully updated!');
        }
    });
});

router.post('/login', function (req, res) {
    console.log(req.body)
    User.findOne({
        _phone: req.body._phone,
    }).select().exec(function (err, user) {
        if (err) {
            res.status(200).send({success: false, message: "User not found"});
            return console.error(err);
        }
        else {
            if (!user)
                res.status(200).send({success: false, message: "Phone is incorrect"});
            else {
                bcrypt.compare(req.body._password, user._hashed_password, function (err, resp) {
                    // res == true
                    if (resp == true) {
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
                        res.status(200).send({success: false, message: "Password is incorrect"});
                    }
                });
            }
        }
    });

});

router.get('/me', ensureAuthorized, function (req, res) {
    User.findOne({_token: req.token}, function (err, user) {
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


