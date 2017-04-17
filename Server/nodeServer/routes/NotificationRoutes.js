var express = require('express');
var router = express.Router();
var Notifications = require('../models/Notifications');

router.get('/getall', function (req, res) {

// get all
    Notifications.find({}, function (err, notifications) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(notifications);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
