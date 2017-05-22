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

router.post('/remove', function (req, res) {
    console.log(JSON.stringify(req.body));

    removeTeam();
    function removeTeam() {
        TeamList.findOne({_team_id: req.body._team_id}).select().exec(function (err, team) {
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

    res.status(200).send('Team list removed!');
});

router.post('/adds', function (req, res) {
    var areas = JSON.parse(req.body._areas);
    console.log(areas);

    removeTeam();
    function removeTeam() {
        TeamList.findOne({_team_id: req.body._team_id}).select().exec(function (err, team) {
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
        var areasLength = areas.length;
        if(areasLength != 0)
        {
            for (var i = 0; i < areas.length; i++) {
                console.log(i);
                var newTeam = {
                    _team_id: req.body._team_id,
                    _name: req.body._name,
                    _area: areas[i].area,
                    _status: req.body._status,
                    _description: req.body._description
                };
                console.log(newTeam);
                var Team = new TeamList(newTeam);
                // save
                Team.save();
            }
        }
        else
        {
            var newTeam = {
                _team_id: req.body._team_id,
                _name: req.body._name,
                _status: req.body._status,
                _description: req.body._description
            };
            var Team = new TeamList(newTeam);
            Team.save();
        }
        res.status(200).send('Team created!');
    }
});

router.post('/getbyid', function (req, res) {
    console.log(req.body);

    TeamList.find({_team_id: req.body.id}, function (err, team) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(team);
            console.log('Find one success!!!');
        }
    });
});

module.exports = router;
