var express = require('express');
var router = express.Router();
var DeliveryArea = require('../models/DeliveryArea');

router.get('/getall', function (req, res) {
// get all
    DeliveryArea.find({}, function (err, areas) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(areas);
            console.log('Find all success!!!');
        }
    });
});

router.post('/add', function (req, res) {
    var newArea = new DeliveryArea(req.body);
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

router.post('/getbyphone', function (req, res) {
    DeliveryArea.find({_phone_user: req.body._phone}, function (err, areas) {
        if (err) {
            res.status(200).send(repHttp(false, err));
            return console.error(err);
        }
        else {
            res.status(200).send(areas);
            console.log('Find success!!! ' + areas.length);
        }
    });
});

module.exports = router;
