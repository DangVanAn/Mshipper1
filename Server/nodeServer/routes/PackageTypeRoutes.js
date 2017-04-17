var express = require('express');
var router = express.Router();
var PackageType = require('../models/PackageType');

router.get('/getall', function (req, res) {

// get all
    PackageType.find({}, function (err, packageTypes) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(packageTypes);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
