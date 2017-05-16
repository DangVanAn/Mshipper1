var express = require('express');
var router = express.Router();
var UsersTeamList = require('../models/UsersTeamList');

router.get('/getall', function (req, res) {

// get all
    UsersTeamList.find({}, function (err, usersTeamLists) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(usersTeamLists);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
