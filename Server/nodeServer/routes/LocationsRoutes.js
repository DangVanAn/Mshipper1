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
router.post('/postLocation', function (req, res) {
    console.log(req.body);

    try {
        var newLocation = new Locations(req.body);
        newLocation.save(function (err) {
            if (err)
                return console.error(err);
            else {
                res.status(200).send({rep: "Updated location of use"});
                console.log('Location created!');
            }
        });
    }
    catch(err) {
        console.log(err.message);
    }

});

module.exports = router;
