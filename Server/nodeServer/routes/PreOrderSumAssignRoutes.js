var express = require('express');
var HashMap = require('hashmap');
const uuidv1 = require('uuid/v1');
var router = express.Router();
var AssignDriver = require('../models/AssignDriver');
var PreOrderSum = require('../models/PreOrderSum');
var PreOrderSumAssign = require('../models/PreOrderSumAssign');
var PreOrderAssign = require('../models/PreOrdersAssign');
var admin = require("firebase-admin");

var hashmap = new HashMap();

var listPreOrderSum = [];
var listPreOrderSumAssign = [];
resetListPreOrderSumAssign();

function resetListPreOrderSumAssign() {
    PreOrderSumAssign.find({}, function (err, preordersumassign) {
        if (err)
            return console.error(err);
        else {
            listPreOrderSumAssign = JSON.parse(JSON.stringify(preordersumassign));
            resetListPreOrderSum();
            console.log('Find all success!!!');
        }
    });
}

function resetListPreOrderSum() {
    PreOrderSum.find({ _is_enabled: true }, function (err, preordersum) {
        if (err)
            return console.error(err);
        else {
            listPreOrderSum = preordersum;

            for (var i = 0; i < listPreOrderSumAssign.length; i++) {
                for (var j = 0; j < listPreOrderSum.length; j++) {
                    if (listPreOrderSumAssign[i]._pre_sum_time == listPreOrderSum[j]._pre_sum_time) {
                        listPreOrderSumAssign[i]._id_warehouse = listPreOrderSum[j]._id_warehouse;
                        listPreOrderSumAssign[i]._id_delivery = listPreOrderSum[j]._id_delivery;
                        listPreOrderSumAssign[i]._etd = listPreOrderSum[j]._etd;
                        listPreOrderSumAssign[i]._eta = listPreOrderSum[j]._eta;
                        listPreOrderSumAssign[i]._type_product = listPreOrderSum[j]._type_product;
                    }
                }
            }
        }
    })
}


router.post('/getall', function (req, res) {
    // get all
    res.status(200).send(listPreOrderSumAssign);
});

router.post('/getbyidpresumassign', function (req, res) {
    console.log(req.body);
    var listGet = [];
    for (var i = 0; i < req.body.length; i++) {
        for (var j = 0; j < listPreOrderSumAssign.length; j++) {
            if (listPreOrderSumAssign[j]._id == req.body[i]._id) {
                listGet.push(listPreOrderSumAssign[j]);
            }
        }
    }

    res.status(200).send({ success: true, message: "OK", data: JSON.stringify(listGet) });
});

router.post('/getbypresumtime', function (req, res) {
    // console.log(req.body);
    var listGet = [];
    for (var i = 0; i < req.body.length; i++) {
        for (var j = 0; j < listPreOrderSumAssign.length; j++) {
            if (listPreOrderSumAssign[j]._pre_sum_time == req.body[i]._pre_sum_time) {
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
                        resetListPreOrderSumAssign();
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
            setTimeout(function() {
                noti(element, preordersumassign);
            }, 15000);
            res.status(200).send({ success: true, message: "updated!" });
            resetListPreOrderSumAssign();
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

    var listData = [];
    for (var i = 0; i < listPreOrderSumAssign.length; i++) {
        //hiện tại đang set mặc định là chưa có vào trạng thái đó.
        if (listPreOrderSumAssign[i][elementTrue] !== 0 && listPreOrderSumAssign[i][elementFalse] === 0 && listPreOrderSumAssign[i]._id_warehouse == req.body._id_warehouse) {
            listData.push(listPreOrderSumAssign[i]);
        }
    }

    //trong listData kiểm tra xem thằng nào có cùng số trip sẽ gộp lại thành 1 line;
    var listData_Sub = [];
    var listTrip = [];
    for (var i = 0; i < listData.length; i++) {
        if (listTrip.indexOf(listData[i]._trip) === -1) {
            listTrip.push(listData[i]._trip);
            listData_Sub.push({_trip : listData[i]._trip, data : [listData[i]], order : []});
        }
        else {
            for (var j = 0; j < listData_Sub.length; j++) {
                if (listData_Sub[j]._trip === listData[i]._trip) {
                    listData_Sub[j].data.push(listData[i]);
                    break;
                }
            }
        }
    }

    var listOrder =  getPreOrderAssignByTrip(listTrip);

    console.log('269', listOrder.length);

    for(var i = 0; i < listData_Sub.length; i++)
    {
        //đang làm gán thêm thông tin order cho khách hàng
    }

    res.status(200).send({success: true, message: listData_Sub.length, data: JSON.stringify(listData_Sub)});
});

function getPreOrderAssignByTrip(trip) {
    PreOrderAssign.find({
        _trip: trip,
        _is_enabled: true
    }).select().exec(function (err, preorderassign) {
        if (err)
            console.error(err);
        else {
            console.log('287', preorderassign.length);
            return preorderassign;
        }
    });
};

function setAssignDriverEnabledFalse(_pre_sum_assign_time) {
    AssignDriver.find({ _pre_sum_assign_time: _pre_sum_assign_time }).select().exec(function (err, preordersumassigndriver) {
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

router.findPreOrderSumAssignByPreSumTime = function (_pre_sum_time) {
    var listData = [];
    for (var i = 0; i < listPreOrderSumAssign.length; i++) {
        if (listPreOrderSumAssign[i]._pre_sum_time == _pre_sum_time) {
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
            resetListPreOrderSumAssign();
        }
    });
};

module.exports = router;