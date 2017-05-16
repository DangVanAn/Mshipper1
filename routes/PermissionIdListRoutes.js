var express = require('express');
var router = express.Router();
var PermissionIdList = require('../models/PermissionIdList');

router.get('/getall', function (req, res) {

// get all
    PermissionIdList.find({}, function (err, permissionIdLists) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(permissionIdLists);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
