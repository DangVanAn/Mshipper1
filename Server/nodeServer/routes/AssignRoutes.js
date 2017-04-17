var express = require('express');
var router = express.Router();
var Assign = require('../models/Assign');

router.get('/getall', function (req, res) {

// get all the
    Assign.find({}, function (err, assigns) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(assigns);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
