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
    }).select('-_token -_hashed_password');
});

router.post('/getbypermission', function (req, res) {
    User.find({_permission_id : req.body._permission_id}, function (err, users) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(users);
            console.log('Find all success!!!');
        }
    }).select('-_token -_hashed_password');
});

router.post('/getbypermissionandidmanager', function (req, res) {
    console.log(req.body);
    User.find({_permission_id : req.body._permission_id, _id_delivery_manager : req.body._id_delivery_manager}, function (err, users) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(users);
            console.log('Find all success!!!');
        }
    }).select('-_token -_hashed_password');
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

router.post('/adds', function (req, res) {

    var listData = req.body;
    console.log(listData.length);

    var index = 0;
    var listPhoneExist = '';

    findFuntion(index);

    function findFuntion(index) {
        User.findOne({_phone: listData[index]._phone
        }).select().exec(function (err, user) {
            if (err)
                return console.error(err);
            else {
                if (user) {
                    listPhoneExist += ' ' + listData[index]._phone;
                }
                index++;
                if(index < listData.length){
                    findFuntion(index);
                }
                else {
                    bcryptFuntion();
                }
            }
        });
    }

    var mainHash = '';
    function bcryptFuntion() {
        if(listPhoneExist.length > 0)
        {
            res.status(200).send('Số điện thoại:' +listPhoneExist + ' Đã tồn tại');
        }
        else {
            bcrypt.hash('123456', 10, function(err, hash) {
                mainHash = hash;

                saveFuntion();
            });

        }
    }

    function saveFuntion() {
        for(var i = 0; i < listData.length; i++)
        {
            var time = new Date().getTime().toString();
            listData[i]._token = (jwt.sign({bum: time + keyJWT, user: listData[i]._phone}, keyJWT) + ' ' + time).split(".")[2];
            listData[i]._hashed_password = mainHash;
        }

        User.insertMany(listData, function(err, docs) {
            if(err) {
                res.status(200).send('Error!');
                console.log('Error!');
            }
            else {
                res.status(200).send('Users created!');
                console.log('Users created!');
            }
        });
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
    }).select('-_token -_hashed_password');
});

router.post('/updatebyphone', function (req, res) {
    User.findOneAndUpdate({ _phone: req.body._phone }, req.body, function (err, user) {
        if (err)
            return console.error(err);
        else {
            if(user)
            {
                res.status(200).send('User successfully updated!');
                console.log('User successfully updated!');
            }
            else {
                res.status(200).send('User unsuccessfully updated!');
                console.log('User unsuccessfully updated!');
            }
        }
    });
});

router.post('/login', function (req, res) {
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
                        //user update _device_token
                        // console.log(req.body)
                        // if (!req.body._device_token) {
                        //     res.status(200).send({
                        //         success: false, message: "_device_token is empty", data: ""
                        //     });
                        //     return
                        // }

                        user._device_token = req.body._device_token;
                        user.save(function (err) {
                            if (err)
                            {
                                res.status(200).send({success: false, message: "Update _device_token Failed"});
                                return
                            }
                        });
                        var userRes = {
                            _id : user._id,
                            _phone: user._phone,
                            _permission_id: user._permission_id,
                            _identify_card: user._identify_card,
                            _id_delivery_manager : user._id_delivery_manager,
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


