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

router.post('/add', function (req, res) {

    var newTL = new TeamLead(req.body);
    console.log(req.body);

    newTL.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Team lead created!');
            console.log('Team lead created!');
        }
    });
});

router.post('/remove', function (req, res) {
    console.log(JSON.stringify(req.body));

    removeTeam();
    function removeTeam() {
        TeamLead.findOne({_team_id: req.body._team_id}).select().exec(function (err, team) {
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

    res.status(200).send('Team lead removed!');
});

router.post('/adds', function (req, res) {
    console.log(JSON.stringify(req.body));

    removeTeam();
    function removeTeam() {
        TeamLead.findOne({_team_id: req.body._team_id}).select().exec(function (err, team) {
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
                _team_lead: team[i]._email
            };
            console.log(newTeam);
            var Team = new TeamLead(newTeam);
            // save
            Team.save();
        }
    }

    res.status(200).send('Team lead created!');
});

module.exports = router;
