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

module.exports = router;
