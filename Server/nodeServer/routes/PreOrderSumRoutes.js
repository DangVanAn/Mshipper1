var express = require('express');
var HashMap = require('hashmap');
var router = express.Router();

// var assignDriverRoute = require('../routes/AssignDriverRoutes');
const uuidv1 = require('uuid/v1');
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
    PreOrderSum.find({}, function (err, preordersum) {
        if (err)
            return console.error(err);
        else {
            listPreOrderSum = [];
            listPreOrderSum = preordersum;
            console.log('Find all success!!!');
        }
    });
}

router.post('/getall', function (req, res) {
// get all
     res.status(200).send(listPreOrderSum);
});

router.post('/getrefuse', function (req, res) {
    var data  =[];
    for(var i = 0; i < listPreOrderSum.length; i++)
    {
        if(listPreOrderSum[i]._time_refuse != undefined && listPreOrderSum[i]._is_enabled == true)
        {
            data.push(listPreOrderSum[i]);
        }
    }
    res.status(200).send(data);
});

router.post('/add', function (req, res) {

    req.body._pre_sum_time = uuidv1();
    console.log(req.body);
    var newPreOrderSum = new PreOrderSum(req.body);

    newPreOrderSum.save(function (err) {
        if (err) {
            console.log('Error!');
            res.status(200).send('error!');
        }
        else {
            res.status(200).send('success!');
            resetListPreOrderSum();
        }
    });
});

router.post('/setfalse', function (req, res) {

    PreOrderSum.findOne({_id: req.body._id
    }).select().exec(function (err, data) {
        if (err)
        {
            res.status(200).send("error!");
            return console.error(err);
        }
        else {
            if (!data) {
                data._is_enabled = false;
                data.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send('success!');
                        resetListPreOrderSum();
                        console.log('success!');
                    }
                });
            }
            else {
                res.status(200).send("error!");
            }
        }
    });
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
                accept(preordersum, req.body._ton_action, req.body._user_accept);
                res.status(200).send("success!");
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
                refuse(preordersum, req.body._ton_action, req.body._note_refuse, req.body._user_refuse);
                res.status(200).send("success!");
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

router.post('/verifyrequest', function (req, res) {
    PreOrderSum.find({_id_delivery_manager: req.body[0]._id_delivery_manager, _is_enabled  : true}).select().exec(function (err, preordersum) {
        if (err)
            return console.error(err);
        else {
            for(var i = 0; i < preordersum.length; i++)
            {
                for(var j = 0; j < req.body.length; j++){
                    if(req.body[j]._id == preordersum[i]._id){
                        //Nếu số tấn thực hiện nhỏ hơn thì refuse
                        //Nếu số tấn thực hiện lớn hơn hoặc bằng thì accept
                        if(req.body[j]._ton_action < req.body[j]._ton){
                            refuse(preordersum[i], req.body[j]._ton_action, 'delivery manager refuse', req.body[0]._id_delivery_manager);
                        }
                        else {
                            accept(preordersum[i], req.body[j]._ton_action, req.body[0]._id_delivery_manager);
                        }
                    }
                }
            }
            res.status(200).send("success!");
        }
    });
});

function refuse(preordersum, ton_action, note, user_action) {
    preordersum._ton_action = ton_action;
    preordersum._time_refuse = new Date().getTime();
    preordersum._note_refuse = note;
    preordersum._user_refuse = user_action;

    preordersum.save(function (err) {
        if (err)
            return console.error(err);
        else {
            console.log('success refuse!');
            resetListPreOrderSum();
        }
    });
}

function accept(preordersum, ton_action, user_action) {
    preordersum._ton_action = ton_action;
    preordersum._time_accept = new Date().getTime();
    preordersum._user_accept = user_action;
    preordersum.save(function (err) {
        if (err)
            return console.error(err);
        else {
            console.log('success accept!');
            resetListPreOrderSum();
        }
    });
}

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