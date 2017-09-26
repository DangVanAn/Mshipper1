var express = require('express');
var HashMap = require('hashmap');
var router = express.Router();

var AssignDriver = require('../models/AssignDriver');
var preOrderSumAssignRoutes = require('../routes/PreOrderSumAssignRoutes');
var preOrderSumRoute = require('../routes/PreOrderSumRoutes');

var hashmap = new HashMap();

var listPreOrderSumAssignDriver = [];
resetListPreOrderSumAssignDriver();
function resetListPreOrderSumAssignDriver() {
    listPreOrderSumAssignDriver = [];
    AssignDriver.find({}, function (err, preordersumassigndriver) {
        if (err)
            return console.error(err);
        else {
            listPreOrderSumAssignDriver = preordersumassigndriver;
            console.log('Find all success!!!');
        }
    });
}

router.post('/getall', function (req, res) {
// get all
    res.status(200).send(listPreOrderSumAssignDriver);
});

router.post('/getbydriver', function (req, res) {
    var listData = [];
    for(var i = 0; i < listPreOrderSumAssignDriver.length; i++){
        if(listPreOrderSumAssignDriver[i]._driver == req.body._driver){
            listData.push(listPreOrderSumAssignDriver[i]);
        }
    }
    res.status(200).send({success: true, message: "OK", data: JSON.stringify(listData)});
});

router.post('/getbypresumassigntime', function (req, res) {
    var listData = [];
    for(var i = 0; i < listPreOrderSumAssignDriver.length; i++){
        if(listPreOrderSumAssignDriver[i]._pre_sum_assign_time == req.body._pre_sum_assign_time){
            listData.push(listPreOrderSumAssignDriver[i]);
        }
    }
    res.status(200).send({success: true, message: "OK", data: JSON.stringify(listData)});
});

router.post('/add', function (req, res) {
    AssignDriver.insertMany(req.body, function (err, docs) {
        if (err) {
            res.status(200).send('error!');
            console.log('error!');
        }
        else {
            res.status(200).send('created!');
            console.log('created!');
            resetListPreOrderSumAssignDriver();
        }
    });
});


var listPreOrderSum = [];
var listPreOrderSumAssign = [];

router.post('/getallinfo', function (req, res) {
    var listData = [];
    listPreOrderSum = preOrderSumRoute.getListPreOrderSum();
    listPreOrderSumAssign = preOrderSumAssignRoutes.getListPreOrderSumAssign();
    for(var i = 0; i < listPreOrderSumAssignDriver.length; i++){
        if(listPreOrderSumAssignDriver[i]._driver == req.body._id){
            console.log('-------74');
            listData.push(JSON.parse(JSON.stringify(listPreOrderSumAssignDriver[i])));
        }
    }

    for(var i = 0; i < listData.length; i++){
        listData[i]._other_driver = [];
        for(var j = 0; j < listPreOrderSumAssignDriver.length; j++){
            if(listPreOrderSumAssignDriver[j]._pre_sum_assign_time == listData[i]._pre_sum_assign_time && listData[i]._id != listPreOrderSumAssignDriver[j]._id){
                console.log('-------82');
                listData[i]._other_driver.push(JSON.parse(JSON.stringify(listPreOrderSumAssignDriver[j])));
            }
        }
    }

    for(var i = 0; i < listData.length; i++){
        listData[i]._pre_order_sum_assign = [];
        for(var j = 0; j < listPreOrderSumAssign.length; j++){
            if(listPreOrderSumAssign[j]._pre_sum_assign_time == listData[i]._pre_sum_assign_time){
                listData[i]._pre_order_sum_assign.push(JSON.parse(JSON.stringify(listPreOrderSumAssign[j])));
            }
        }
    }

    for(var i = 0; i < listData.length; i++){
        for(var ii = 0; ii < listData[i]._pre_order_sum_assign.length; ii++){
            listData[i]._pre_order_sum_assign[ii]._pre_order_sum = [];
            for(var j = 0; j < listPreOrderSum.length; j++){
                if(listPreOrderSum[j]._pre_sum_time == listData[i]._pre_order_sum_assign[ii]._pre_sum_time){
                    listData[i]._pre_order_sum_assign[ii]._pre_order_sum.push(JSON.parse(JSON.stringify(listPreOrderSum[j])));
                }
            }
        }
    }

    res.status(200).send({success: true, message: "OK", data: JSON.stringify(listData)});
});


// router.setAssignDriverEnabledFalse = function (_pre_sum_assign_time) {
//     AssignDriver.find({_pre_sum_assign_time: _pre_sum_assign_time}).select().exec(function (err, preordersumassigndriver) {
//         if (err)
//             return console.error(err);
//         else {
//             for (var i = 0; i < preordersumassigndriver.length; i++) {
//                 console.log('driver driver driver driver driver driver ');
//                 preordersumassigndriver[i]._is_enabled = false;
//                 preordersumassigndriver[i].save(function (err) {
//                     if (err)
//                         console.error(err);
//                     else {
//                         console.log('set sum assign driver _is_enabled = false success');
//                     }
//                 });
//             }
//         }
//     });
// };

module.exports = router;