var express = require('express');
var router = express.Router();
var PermissionTypeList = require('../models/PermissionTypeList');

router.get('/getall', function (req, res) {

// get all
    PermissionTypeList.find({}, function (err, permissionTypeLists) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(permissionTypeLists);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
