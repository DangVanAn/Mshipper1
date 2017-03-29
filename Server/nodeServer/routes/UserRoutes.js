var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/getall', function (req, res) {

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

module.exports = router;
