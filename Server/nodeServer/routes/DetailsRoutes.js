var express = require('express');
var router = express.Router();
var Details = require('../models/Details');

router.get('/getall', function (req, res) {

// get all
    Details.find({}, function (err, details) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(details);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
