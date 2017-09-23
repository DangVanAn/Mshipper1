var express = require('express');
var HashMap = require('hashmap');
var router = express.Router();

// var assignDriverRoute = require('../routes/AssignDriverRoutes');
var AssignDriver = require('../models/AssignDriver');
var PreOrder = require('../models/PreOrders');
var preOrderRoute = require('../routes/PreOrderRoutes');
var PreOrderSum = require('../models/PreOrderSum');
var PreOrderSumAssign = require('../models/PreOrderSumAssign');
var preOrderSumAssignRoutes = require('../routes/PreOrderSumAssignRoutes');

var hashmap = new HashMap();

var listPreOrderSum = [];

resetListPreOrderSum();
function resetListPreOrderSum() {
    listPreOrderSum = [];
    PreOrderSum.find({}, function (err, preordersum) {
        if (err)
            return console.error(err);
        else {
            listPreOrderSum = preordersum;
            console.log('Find all success!!!');
        }
    });
}

router.post('/getall', function (req, res) {
// get all
     res.status(200).send(listPreOrderSum);
});

router.post('/getbyidpresum', function (req, res) {
    // console.log(req.body);
    var listGet = [];
    for (var i = 0; i < req.body.length; i++) {
        for (var j = 0; j < listPreOrderSum.length; j++) {
            if (listPreOrderSum[j]._id == req.body[i]._id) {
                listGet.push(listPreOrderSum[j]);
            }
        }
    }
    res.status(200).send({success: true, message: "OK", data: JSON.stringify(listGet)});
});

router.post('/accept', function (req, res) {
    PreOrderSum.findOne({_id: req.body._id}).select().exec(function (err, preordersum) {
        if (err)
            return console.error(err);
        else {
            if (preordersum) {
                preordersum._time_accept = new Date().getTime();
                preordersum._user_accept = req.body._user_accept;
                preordersum.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send("success!");
                        console.log('success!');
                        resetListPreOrderSum();
                    }
                });
            }
            else {
                res.status(200).send("error!");
                console.log('error!')
            }
        }
    });
});

router.post('/refuse', function (req, res) {
    PreOrderSum.findOne({_id: req.body._id}).select().exec(function (err, preordersum) {
        if (err)
            return console.error(err);
        else {
            if (preordersum) {
                preordersum._time_refuse = new Date().getTime();
                preordersum._is_enabled = false;
                preordersum._note_refuse = req.body._note_refuse;
                preordersum._user_refuse = req.body._user_refuse;

                preordersum.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send("success!");
                        console.log('success!');
                        resetListPreOrderSum();
                    }
                });
            }
            else {
                res.status(200).send("error!");
                console.log('error!')
            }
        }
    });
});

router.post('/cancel', function (req, res) {
    PreOrderSum.findOne({_id: req.body._id}).select().exec(function (err, preordersum) {
        if (err)
            return console.error(err);
        else {
            if (preordersum) {
                console.log('114', preordersum);
                if (req.body._time_accept !== undefined) {
                    //kiểm tra nếu đã được accept
                    //có 2 trường hợp
                    // + TH1: danh sách xe assign chưa chạy thì hủy toàn bộ
                    // + TH2: danh sách xe assign đã có xe chạy, thì hủy sum cũ, tạo sum mới bằng tổng xe assign đã chạy.
                    var preordersumassign = preOrderSumAssignRoutes.findPreOrderSumAssignByPreSumTime(req.body._pre_sum_time);
                    console.log('115', preordersumassign);
                    var listSumAssignGoing = [];
                    for (var i = 0; i < preordersumassign.length; i++) {
                        console.log('going going going going going going');
                        console.log(preordersumassign[i]._out_line_driver, preordersumassign[i]._out_line_manager_warehouse);
                        if (preordersumassign[i]._out_line_driver !== undefined && preordersumassign[i]._out_line_manager_warehouse !== undefined) {
                            listSumAssignGoing.push(preordersumassign[i]);
                        }
                        else {
                            //nếu chưa chạy thì cho _is_enabled = false
                            preordersumassign[i]._is_enabled = false;
                            setAssignDriverEnabledFalse(preordersumassign[i]._pre_sum_assign_time);
                            preOrderSumAssignRoutes.savePreOrderSumAssign(preordersumassign[i]);
                        }
                    }
                    if(listSumAssignGoing.length > 0){
                        console.log('142', 'co', listSumAssignGoing.length, 'ra khoi hang lay don hang');
                        var newPreOrderSum = new PreOrderSum(preordersum);
                        newPreOrderSum._id = undefined;
                        newPreOrderSum._time_update = new Date().getTime();
                        newPreOrderSum._note_update = 'cancel sum old';
                        newPreOrderSum._ton = 0;
                        for(var i = 0; i < listSumAssignGoing.length; i++)
                        {
                            newPreOrderSum._ton += listSumAssignGoing[i]._ton_for_vehicle;
                        }
                        newPreOrderSum.save(function (err) {
                            if (err)
                                console.error(err);
                            else {
                                console.log('create preorder sum new success');
                            }
                        })
                    }
                }

                preordersum._time_cancel = new Date().getTime();
                preordersum._is_enabled = false;
                preordersum._note_cancel = req.body._note;
                preordersum._user_cancel = req.body._user;

                preordersum.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send("success!");
                        console.log('success!');
                        resetListPreOrderSum();
                    }
                });
            }
            else {
                res.status(200).send("error!");
                console.log('error!')
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

router.getListPreOrderSum = function () {
    return listPreOrderSum;
};

router.insertPreOrderSum = function (listData) {
    PreOrderSum.insertMany(listData, function (err, docs) {
        if (err) {
            console.log('Error!');
        }
        else {
            console.log('PreOrdersSum created!');
            resetListPreOrderSum();
        }
    });
};

module.exports = router;