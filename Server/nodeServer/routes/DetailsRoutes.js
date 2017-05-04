var express = require('express');
var router = express.Router();
var Details = require('../models/Details');

router.get('/getall', function (req, res) {
    Details.find({}, function (err, details) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(details);
            console.log('Find all success!!!');
        }
    });
});

router.post('/add', function (req, res) {

    var newDetails = new Details(req.body);
    console.log(newDetails);
    console.log(req.body);

    newDetails.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Details created!');
            console.log('Details created!');
        }
    });
});

module.exports = router;
