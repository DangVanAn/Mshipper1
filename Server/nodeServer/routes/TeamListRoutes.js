var express = require('express');
var router = express.Router();
var TeamList = require('../models/TeamList');

router.get('/getall', function (req, res) {

// get all
    TeamList.find({}, function (err, teamLists) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(teamLists);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
