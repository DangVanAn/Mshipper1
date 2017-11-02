var express = require('express');
var HashMap = require('hashmap');
const uuidv1 = require('uuid/v1');
var router = express.Router();
var AssignDriver = require('../models/AssignDriver');
var PreOrderSum = require('../models/PreOrderSum');
var PreOrderSumAssign = require('../models/PreOrderSumAssign');

var hashmap = new HashMap();

var listPreOrderSumAssign = [];
resetListPreOrderSumAssign();
function resetListPreOrderSumAssign() {
    PreOrderSumAssign.find({}, function (err, preordersumassign) {
        if (err)
            return console.error(err);
        else {
            listPreOrderSumAssign = [];
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
    req.body._time_create = new Date().getTime();

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

router.post('/update', function (req, res) {
    PreOrderSumAssign.findOne({_pre_sum_assign_time : req.body._pre_sum_assign_time, _is_enabled : true}, function (err, preordersumassign) {
        if (err)
            return console.error(err);
        else {
            if(preordersumassign._start_pickup !== 0){
                res.status(200).send('vehicle is moving!');
                console.log('vehicle is moving!');
            }
            else {
                preordersumassign._note_trip = req.body._note_trip;
                preordersumassign._name_drivers = req.body._name_drivers;
                preordersumassign._id_drivers = req.body._id_drivers;

                preordersumassign.save(function (err) {
                    if (err)
                        console.error(err);
                    else {
                        res.status(200).send('updated!');
                        console.log('96 - updated!');
                        resetListPreOrderSumAssign();
                    }
                });
            }
            console.log('Find all success!!!', '85');
        }
    });
});

router.post('/cancel', function (req, res) {
    PreOrderSumAssign.findOne({_pre_sum_assign_time : req.body._pre_sum_assign_time, _is_enabled : true}, function (err, preordersumassign) {
        if (err)
            return console.error(err);
        else {
            if(preordersumassign._out_line_driver !== 0 && preordersumassign._out_line_manager_warehouse !== 0){
                res.status(200).send('vehicle is moving!');
                console.log('vehicle is moving!');
            }
            else {
                preordersumassign._is_enabled = false;
                preordersumassign._time_cancel = new Date().getTime();
                preordersumassign._note_cancel = 'trip cancel';

                preordersumassign.save(function (err) {
                    if (err)
                        console.error(err);
                    else {
                        res.status(200).send('updated!');
                        console.log('96 - updated!');
                        resetListPreOrderSumAssign();
                        setAssignDriverEnabledFalse(req.body._pre_sum_assign_time);
                    }
                });
            }
            console.log('Find all success!!!', '85');
        }
    });
});

router.post('/setstatus', function (req, res) {
    console.log(req.body);
    console.log(req.body.time);

    PreOrderSumAssign.findOne({_id : req.body._pre_order_sum_assign, _is_enabled : true}, function (err, preordersumassign) {
        if (err)
        {
            console.error(err);
            res.status(200).send({ success: false, message: "error!"});
            return console.error(err);
        }
        else {
            if(preordersumassign !== null){
                preordersumassign[req.body.element] = req.body.time;

                preordersumassign.save(function (err) {
                    if (err) {
                        console.error(err);
                        res.status(200).send({ success: false, message: "error!"});
                    }
                    else {
                        res.status(200).send({ success: true, message: "updated!"});
                        resetListPreOrderSumAssign();
                    }
                });
            }
            else {
                console.log('null!');
                res.status(200).send({ success: false, message: "null!"});
            }
        }
    });
});

function setAssignDriverEnabledFalse(_pre_sum_assign_time) {
    AssignDriver.find({_pre_sum_assign_time: _pre_sum_assign_time}).select().exec(function (err, preordersumassigndriver) {
        if (err)
            return console.error(err);
        else {
            for (var i = 0; i < preordersumassigndriver.length; i++) {
                console.log('driver driver driver driver driver driver ');
                preordersumassigndriver[i]._is_enabled = false;
                preordersumassigndriver[i].save(function (err) {
                    if (err)
                        console.error(err);
                    else {
                        console.log('set sum assign driver _is_enabled = false success');
                    }
                });
            }
        }
    });
}

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