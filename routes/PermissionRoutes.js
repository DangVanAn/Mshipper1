var express = require('express');
var router = express.Router();
var Permission = require('../models/Permission');

router.get('/getall', function (req, res) {

// get all
    Permission.find({}, function (err, permissions) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(permissions);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
