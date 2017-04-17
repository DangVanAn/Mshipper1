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
module.exports = router;
