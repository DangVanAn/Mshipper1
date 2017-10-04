var express = require('express');
var router = express.Router();
var Chats = require('../models/Chat');

router.get('/getall', function (req, res) {

// get all
    Chats.find({}, function (err, chats) {
        if (err) {
            res.status(200).send(repHttp(false, err));
            return console.error(err);
        }
        else {
            res.status(200).send(chats);
            console.log('Find all success!!!');
        }
    });
});

router.post('/getbygroupid', function (req, res) {

// get all
    Chats.find({_group_id : req.body._group_id}, function (err, chats) {
        if (err) {
            res.status(200).send(repHttp(false, err));
            return console.error(err);
        }
        else {
            res.status(200).send({success: true, message: "OK", data: JSON.stringify(chats)});
            console.log('Find all success!!!');
        }
    });
});

function addMessage(data) {

}

module.exports = router;
