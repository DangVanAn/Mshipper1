var express = require('express');
var router = express.Router();
var Locations = require('../models/Locations');

router.get('/getall', function (req, res) {

// get all
    Locations.find({}, function (err, locations) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(locations);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
