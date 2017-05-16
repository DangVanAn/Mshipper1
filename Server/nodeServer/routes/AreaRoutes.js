var express = require('express');
var router = express.Router();
var Area = require('../models/Area');

router.get('/getall', function (req, res) {

// get all
    Area.find({}, function (err, areas) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(areas);
            console.log('Find all success!!!');
        }
    });
});

router.post('/add', function (req, res) {

    var newArea = new Area(req.body);
    console.log(newArea);
// save
    newArea.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Area created!');
            console.log('Area created!');
        }
    });
});

module.exports = router;
