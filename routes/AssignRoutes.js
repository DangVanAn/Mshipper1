var express = require('express');
var router = express.Router();
var Assign = require('../models/Assign');

router.get('/getall', function (req, res) {
    Assign.find({}, function (err, assigns) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(assigns);
            console.log('Find all success!!!');
        }
    });
});

router.post('/add', function (req, res) {
    var newAssign = new Assign(req.body);

    newAssign.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Details created!');
            console.log('Details created!');
        }
    });
});

module.exports = router;
