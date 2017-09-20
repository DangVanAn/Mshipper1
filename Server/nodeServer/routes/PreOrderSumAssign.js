var express = require('express');
var HashMap = require('hashmap');
var router = express.Router();

var PreOrder = require('../models/PreOrders');
var PreOrderSum = require('../models/PreOrderSum');
var PreOrderSumAssign = require('../models/PreOrderSumAssign');

var hashmap = new HashMap();

var listPreOrderSumAssign = [];
createListPreOrderSumAssign();
function createListPreOrderSumAssign() {
    listPreOrderSumAssign = [];
    PreOrderSumAssign.find({}, function (err, preordersumassign) {
        if (err)
            return console.error(err);
        else {
            listPreOrderSumAssign = preordersumassign;
            console.log('Find all success!!!');
        }
    });
}

router.post('/getall', function (req, res) {
// get all
    PreOrderSumAssign.find({}, function (err, preordersumassign) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(preordersumassign);
            console.log('Find all success!!!');
        }
    });
//     res.status(200).send(listPreOrdersSum);
});

router.post('/getbyidpresumassign', function (req, res) {
    console.log(req.body);
    var listGet = [];
    for(var i = 0; i < req.body.length; i++)
    {
        for(var j = 0; j < listPreOrderSumAssign.length; j++)
        {
            if(listPreOrderSumAssign[j]._id == req.body[i]._id){
                listGet.push(listPreOrderSumAssign[j]);
            }
        }
    }

    res.status(200).send({success: true, message: "OK", data: JSON.stringify(listGet)});
});

router.post('/getbyidpresum', function (req, res) {
    console.log(req.body);
    var listGet = [];
    for(var i = 0; i < req.body.length; i++)
    {
        for(var j = 0; j < listPreOrderSumAssign.length; j++)
        {
            if(listPreOrderSumAssign[j]._id_pre_sum == req.body[i]._id_pre_sum){
                listGet.push(listPreOrderSumAssign[j]);
            }
        }
    }

    res.status(200).send(listGet);
    // PreOrderSumAssign.find({}, function (err, preordersumassign) {
    //     if (err)
    //         return console.error(err);
    //     else {
    //         res.status(200).send(preordersumassign);
    //         console.log('Find all success!!!');
    //     }
    // });
});

router.post('/add', function (req, res) {
    var listData = [];
    for(var i = 0; i < req.body.number; i++){
        listData.push(req.body);
    }

    PreOrderSumAssign.insertMany(listData, function (err, docs) {
        if (err) {
            res.status(200).send('error!');
            console.log('error!');
        }
        else {
            res.status(200).send('created!');
            console.log('created!');
            createListPreOrderSumAssign();
        }
    });
});

module.exports = router;