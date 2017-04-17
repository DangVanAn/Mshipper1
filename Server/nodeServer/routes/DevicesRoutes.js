var express = require('express');
var router = express.Router();
var Devices = require('../models/Devices');

router.get('/getall', function (req, res) {

// get all
    Devices.find({}, function (err, devices) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(devices);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
