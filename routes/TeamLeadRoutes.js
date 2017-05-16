var express = require('express');
var router = express.Router();
var TeamLead = require('../models/TeamLead');

router.get('/getall', function (req, res) {

// get all
    TeamLead.find({}, function (err, teamLeads) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(teamLeads);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
