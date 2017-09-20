var express = require('express');
var HashMap = require('hashmap');
var router = express.Router();

var PreOrderSumAssignDriver = require('../models/PreOrderSumAssignDriver');

var hashmap = new HashMap();

router.post('/getall', function (req, res) {
// get all
    PreOrderSumAssignDriver.find({}, function (err, preordersumassigndriver) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(preordersumassigndriver);
            console.log('Find all success!!!');
        }
    });
//     res.status(200).send(listPreOrdersSum);
});

router.post('/getbydriver', function (req, res) {
    PreOrderSumAssignDriver.find({_driver : req.body._driver}, function (err, driver) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send({success: true, message: "OK", data: JSON.stringify(driver)});
            console.log('Find pre order sum assign success!!!');
        }
    });
});

router.post('/getbyidpresumassign', function (req, res) {
    PreOrderSumAssignDriver.find({_id_pre_sum_assign : req.body._id_pre_sum_assign}, function (err, preordersumassigndriver) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send({success: true, message: "OK", data: JSON.stringify(preordersumassigndriver)});
            console.log('Find pre order sum assign success!!!');
        }
    });
});

router.post('/add', function (req, res) {
    PreOrderSumAssignDriver.insertMany(req.body, function (err, docs) {
        if (err) {
            res.status(200).send('error!');
            console.log('error!');
        }
        else {
            res.status(200).send('created!');
            console.log('created!');
        }
    });
});

module.exports = router;