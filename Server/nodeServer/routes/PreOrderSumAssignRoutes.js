var express = require('express');
var HashMap = require('hashmap');
const uuidv1 = require('uuid/v1');
var router = express.Router();

var PreOrder = require('../models/PreOrders');
var PreOrderSum = require('../models/PreOrderSum');
var PreOrderSumAssign = require('../models/PreOrderSumAssign');

var hashmap = new HashMap();

var listPreOrderSumAssign = [];
resetListPreOrderSumAssign();
function resetListPreOrderSumAssign() {
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
    res.status(200).send(listPreOrderSumAssign);
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

router.post('/getbypresumtime', function (req, res) {
    // console.log(req.body);
    var listGet = [];
    for(var i = 0; i < req.body.length; i++)
    {
        for(var j = 0; j < listPreOrderSumAssign.length; j++)
        {
            if(listPreOrderSumAssign[j]._pre_sum_time == req.body[i]._pre_sum_time){
                listGet.push(listPreOrderSumAssign[j]);
            }
        }
    }

    res.status(200).send(listGet);
});

router.post('/add', function (req, res) {
    var timeId = uuidv1();
    req.body._pre_sum_assign_time = timeId;
    PreOrderSumAssign.insertMany(req.body, function (err, docs) {
        if (err) {
            res.status(200).send('error!');
            console.log('error!');
        }
        else {
            res.status(200).send(timeId);
            console.log('created!');
            resetListPreOrderSumAssign();
        }
    });
});

router.getListPreOrderSumAssign = function () {
    return listPreOrderSumAssign;
};

router.findPreOrderSumAssignByPreSumTime = function(_pre_sum_time){
    var listData = [];
    for(var i = 0; i < listPreOrderSumAssign.length; i++){
        if(listPreOrderSumAssign[i]._pre_sum_time == _pre_sum_time){
            listData.push(listPreOrderSumAssign[i]);
        }
    }
    return listData;
};

router.savePreOrderSumAssign = function (data) {
    data.save(function (err) {
        if (err)
            console.error(err);
        else {
            console.log('set sum assign _is_enabled = false success');
            resetListPreOrderSumAssign();
        }
    });
};

module.exports = router;