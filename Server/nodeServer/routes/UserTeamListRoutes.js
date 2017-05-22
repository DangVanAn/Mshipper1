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

router.post('/add', function (req, res) {

    var newUT = new UsersTeamList(req.body);
    console.log(req.body);

    newUT.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Details created!');
            console.log('Details created!');
        }
    });
});

router.post('/remove', function (req, res) {
    console.log(JSON.stringify(req.body));

    removeTeam();
    function removeTeam() {
        UsersTeamList.findOne({_team_id: req.body._team_id}).select().exec(function (err, team) {
            if (err)
            {

            }
            else {
                //delete all
                if(team != null)
                {
                    team.remove(function(err) {
                        if (err)
                            return console.error(err);
                        else {
                            removeTeam();
                            console.log('Team successfully remove!');
                        }
                    });
                }
            }
        });
    }

    res.status(200).send('User team list removed!');
});

router.post('/adds', function (req, res) {
    console.log(JSON.stringify(req.body));
    removeTeam();
    function removeTeam() {
        UsersTeamList.findOne({_team_id: req.body._team_id}).select().exec(function (err, team) {
            if (err)
            {

            }
            else {
                //delete all
                if(team != null)
                {
                    team.remove(function(err) {
                        if (err)
                            return console.error(err);
                        else {
                            removeTeam();
                            console.log('Team successfully remove!');
                        }
                    });
                }
                else
                {
                    createTeam();
                }
            }
        });
    }

    function createTeam() {
        var team = JSON.parse(req.body.data);
        console.log('Team bat dau chay ne ::::::::::::::::::::!' + team.length);
        for (var i = 0; i < team.length; i++) {
            console.log(i);
            var newTeam = {
                _team_id: req.body._team_id,
                _user_id: team[i]._email
            };
            console.log(newTeam);
            var Team = new UsersTeamList(newTeam);
            // save
            Team.save();
        }
    }

    res.status(200).send('Team lead created!');
});

module.exports = router;
