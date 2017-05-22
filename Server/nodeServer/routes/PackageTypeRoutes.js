var express = require('express');
var router = express.Router();
var PackageType = require('../models/PackageType');

router.get('/getall', function (req, res) {

// get all
    PackageType.find({}, function (err, packageTypes) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(packageTypes);
            console.log('Find all success!!!');
        }
    });
});

router.post('/getbyid', function (req, res) {
    console.log(req.body);

    PackageType.find({_id: req.body.id}, function (err, user) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(user);
            console.log('Find one success!!!');
        }
    });
});

router.post('/add', function (req, res) {

    var newPT = new PackageType(req.body);
    console.log(req.body);

    newPT.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Package type created!');
            console.log('Package type created!');
        }
    });
});

router.post('/update', function (req, res) {

    var newPT = new PackageType(req.body);
    console.log(req.body);

    removePackageType();
    function removePackageType() {
        PackageType.findOne({_id: req.body._id}).select().exec(function (err, packagetype) {
            if (err) {}
            else {
                //delete all
                if (packagetype != null) {
                    packagetype.remove(function (err) {
                        if (err)
                            return console.error(err);
                        else {
                            removePackageType();
                            console.log('Package successfully remove!');
                        }
                    });
                }
                else
                {
                    newPT.save(function (err) {
                        if (err)
                            return console.error(err);
                        else {
                            res.status(200).send('Package type updated!');
                            console.log('Package type updated!');
                        }
                    });
                }
            }
        });
    }
});

router.post('/remove', function (req, res) {
    removePackageType();
    function removePackageType() {
        PackageType.findOne({_id: req.body._id}).select().exec(function (err, packagetype) {
            if (err) {}
            else {
                //delete all
                if (packagetype != null) {
                    packagetype.remove(function (err) {
                        if (err)
                            return console.error(err);
                        else {
                            removePackageType();
                            console.log('package successfully remove!');
                        }
                    });
                }
                else
                {
                    res.status(200).send('Package type deleted!');
                }
            }
        });
    }
});

module.exports = router;
