var express = require('express');
const uuidv1 = require('uuid/v1');
var router = express.Router();
var AssignDriverRoutes = require('../routes/AssignDriverRoutes');
var PreOrderSumAssign = require('../models/PreOrderSumAssign');
var mainFuntion = require('../routes/MainFuntions');
var admin = require("firebase-admin");

router.post('/getall', function (req, res) {
    var data = mainFuntion.preOrderSumAssign_GetAll();
    res.status(200).send(data);
});

router.post('/getbyidpresumassign', function (req, res) {
    var data = mainFuntion.preOrderSumAssign_GetByIdPreSumAssign(req.body);
    res.status(200).send({ success: true, message: "OK", data: JSON.stringify(data)});
});

router.post('/getbypresumtime', function (req, res) {
    var data = mainFuntion.preOrderSumAssign_GetByPreSumTime(req.body);
    res.status(200).send(data);
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
            mainFuntion.preOrderSumAssign_Add(req.body);
        }
    });
});

router.post('/update', function (req, res) {
    PreOrderSumAssign.findOne({
        _pre_sum_assign_time: req.body._pre_sum_assign_time,
        _is_enabled: true
    }, function (err, preordersumassign) {
        if (err)
            return console.error(err);
        else {
            if (preordersumassign._start_pickup !== 0) {
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
                        mainFuntion.preOrderSumAssign_Update(preordersumassign);
                    }
                });
            }
            console.log('Find all success!!!', '85');
        }
    });
});

router.post('/cancel', function (req, res) {
    PreOrderSumAssign.findOne({
        _pre_sum_assign_time: req.body._pre_sum_assign_time,
        _is_enabled: true
    }, function (err, preordersumassign) {
        if (err)
            return console.error(err);
        else {
            if (preordersumassign._out_line_driver !== 0 && preordersumassign._out_line_manager_warehouse !== 0) {
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
                        mainFuntion.preOrderSumAssign_Update(preordersumassign);
                        AssignDriverRoutes.setAssignDriverEnabledFalse(req.body._pre_sum_assign_time);
                    }
                });
            }
            console.log('Find all success!!!', '85');
        }
    });
});

router.post('/setstatus', function (req, res) {
    var countSave = 0;

    for (var i = 0; i < req.body._pre_order_sum_assign.length; i++) {
        PreOrderSumAssign.findOne({
            _id: req.body._pre_order_sum_assign[i],
            _is_enabled: true
        }, function (err, preordersumassign) {
            if (err) {
                console.error(err);
                res.status(200).send({ success: false, message: "error!" });
                return console.error(err);
            }
            else {
                if (preordersumassign !== null) {
                    preordersumassign[req.body.element] = req.body.time;
                    mainFuntion.preOrderSumAssign_Update(preordersumassign);
                    preordersumassign.save(function (err) {
                        if (err) {
                            console.error(err);
                            res.status(200).send({ success: false, message: "error!" });
                        }
                        else {
                            countSave++;
                            boolResetPreOrderSumAssign(req.body.element, preordersumassign);
                        }
                    });
                }
                else {
                    console.log('null!');
                    res.status(200).send({ success: false, message: "null!" });
                }
            }
        });
    }

    //funtion chỉ chạy khi nào số element đã save bằng số id
    function boolResetPreOrderSumAssign(element, preordersumassign) {
        if (countSave === req.body._pre_order_sum_assign.length) {
            noti(element, preordersumassign);
            res.status(200).send({ success: true, message: "updated!" });
        }
    };
});

function noti(element, preordersumassign){
    //lấy id kho làm topic gửi FCM
    var topic = "VNF";
    var toTypeUser = "";
    var content = "@@";
    if (element === "_in_warehouse_guard") {
        toTypeUser = "A003";
        content = "Xe " + preordersumassign._number_plate + "chuẩn bị vào kho."
    } else if (element === "_in_line_manager_warehouse"){
        toTypeUser = "A003";
        content = "Xe " + preordersumassign._number_plate + "chuẩn bị vào line."
    } else if (element === "_out_line_manager_warehouse"){
        toTypeUser = "A004";
        content = "Xe " + preordersumassign._number_plate + "chuẩn bị rời kho."
    }

    var payload = {
        data: {
            toTypeUser: toTypeUser,// loại user cần gửi
            content: content,// content của notification
            title: "MShipper",//title của notification
            NOTIFICATION_ID: "10",// tùy theo loại notify sẽ có id và code khác nhau
            NOTIFICATION_CODE: "11",
            TYPE_BROADCAST: "BROADCAST_REFRESH_STATE_VEHICLE"//loại broadcast của client
        }
    };

    admin.messaging().sendToTopic(topic, payload)
        .then(function (response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });
}

router.post('/getbyelementzero', function (req, res) {
    //{_id_warehouse : 'NOO', element : '_in_warehouse_guard'}
    //chuẩn bị : 1: vao kho, 2: vao line, 3: ra line, 4: ra kho, 5: den diem giao

    var elementTrue = '';
    var elementFalse = '';

    switch (req.body.status) {
        case 1:
            elementTrue = '_start_pickup';
            elementFalse = '_in_warehouse_guard';
            break;
        case 2:
            elementTrue = '_in_warehouse_guard';
            elementFalse = '_in_line_manager_warehouse';
            break;
        case 3:
            elementTrue = '_in_line_manager_warehouse';
            elementFalse = '_out_line_manager_warehouse';
            break;
        case 4:
            elementTrue = '_out_line_manager_warehouse';
            elementFalse = '_out_warehouse_guard';
            break;
        case 5:
            elementTrue = '_out_warehouse_guard';
            elementFalse = '_in_delivery_driver';
            break;
    }

    var data = mainFuntion.preOrderSumAssign_GetByElementZero(elementTrue, elementTrue, req.body._id_warehouse);

    res.status(200).send({success: true, message: data.length, data: JSON.stringify(data)});
});

router.setIsEnableFalse = function (body) {
    PreOrderSumAssign.findOne({_pre_sum_assign_time: body._pre_sum_assign_time, _is_enabled: true
    }).select().exec(function (err, preordersumassign) {
        if (err)
            console.error(err);
        else {
            preordersumassign._is_enabled = false;
            preordersumassign.save(function (err) {
                if (err)
                    return console.error(err);
                else {
                    mainFuntion.preOrderSumAssign_Update(preordersumassign);
                    console.log('success!');
                }
            });
        }
    });
};

router.updateTonTrip = function (body) {
    PreOrderSumAssign.findOne({
        _id: body._id,
        _is_enabled: true
    }).select().exec(function (err, preordersumassign) {
        if (err)
            console.error(err);
        else {
            preordersumassign._ton_real = body._ton_real;
            preordersumassign._trip = body._trip;
            preordersumassign.save(function (err) {
                if (err)
                    return console.error(err);
                else {
                    mainFuntion.preOrderSumAssign_Update(preordersumassign);
                    console.log('success!');
                }
            });
        }
    });
};

module.exports = router;