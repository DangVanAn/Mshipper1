var express = require('express');
var router = express.Router();
var ModuleList = require('../models/ModuleList');

router.get('/getall', function (req, res) {

// get all
    ModuleList.find({}, function (err, moduleLists) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(moduleLists);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
