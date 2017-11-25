var express = require('express');
var HashMap = require('hashmap');
var router = express.Router();

var PreOrderAssign = require('../models/PreOrdersAssign');
var PreOrderSumAssignRoutes = require('../routes/PreOrderSumAssignRoutes');
var mainFuntion = require('../routes/MainFuntions');
var hashmap = new HashMap();

router.post('/getall', function (req, res) {
    var data = mainFuntion.preOrderAssign_GetAll();
    res.status(200).send(data);
});

var listNewOrdersAssign = [];
var listPreOrdersAssign = [];
var listPreOrdersSumAssign = [];

router.post('/posthandling', function (req, res) {
    listPreOrdersAssign = mainFuntion.preOrderAssign_GetAll();
    listNewOrdersAssign = [];
    console.log(req.body.length);
    for (var i = 0; i < req.body.length; i++) {
        //Kiểm tra xem đơn hàng có trong preOrders không.
        var getOrderHashmap = hashmap.get(req.body[i]._id_order + "assign");
        if (getOrderHashmap !== undefined) {
            //đã tồn tại, kiểm tra có thay đổi không, nếu có thay đổi thì update
            //đã tồn tại, kiểm tra tiếp bên đơn hàng đã thực hiện
            if (!checkComparePreOrder(req.body[i], getOrderHashmap)) {
                //có thay đổi
                console.log(i, 'có thay đổi');
                PreOrderAssign.deleteOne({_id_order: req.body[i]._id_order}, function (err) {
                    if (err) {
                    }
                    else {
                        console.log('Delete', req.body[i]._id_order, 'done!');
                    }
                });

                var index = findIdOrder(req.body[i]._id_order);
                if (index > -1) {
                    console.log('85 vi tri index:', index);
                    listPreOrdersAssign.splice(index, 1);
                }
                hashmap.set(req.body[i]._id_order + "assign", req.body[i]);
                listNewOrdersAssign.push(req.body[i]);
                listPreOrdersAssign.push(req.body[i]);
            }
            else {
                //Đã tồn tại, không thay đổi.
                // console.log(i, 'không thay đổi');
            }
        }
        else {
            //Chưa tồn tại thì lưu vào trong hash tiếp, tạo một danh sách cho những trường hợp update, tạo mới này.
            hashmap.set(req.body[i]._id_order + "assign", req.body[i]);
            listNewOrdersAssign.push(req.body[i]);
            listPreOrdersAssign.push(req.body[i]);
        }
    }

    setPreOrderSumAssign(listNewOrdersAssign);

    res.status(200).send('Xử Lý Thành Công');

    console.log('sau khi xử lý!, còn chạy được không?');
});

function checkComparePreOrder(x, y) {
    if (x._id_order != y._id_order) return false;
    if (x._id_delivery != y._id_delivery) return false;
    if (x._id_customer != y._id_customer) return false;
    if (x._address != y._address) return false;
    if (x._id_warehouse != y._id_warehouse) return false;
    if (x._id_product != y._id_product) return false;
    if (x._name_product != y._name_product) return false;
    if (x._id_product_group != y._id_product_group) return false;
    if (x._type_product != y._type_product) return false;
    if (x._number != y._number) return false;
    if (x._ton != y._ton) return false;
    if (x._etd != y._etd) return false;
    if (x._eta != y._eta) return false;
    if (x._number_plate != y._number_plate) return false;
    if (x._id_delivery_manager != y._id_delivery_manager) return false;

    return true;
}

function findIdOrder(_id_order) {
    for (var i = 0; i < listPreOrdersAssign.length; i++) {
        if (listPreOrdersAssign[i]._id_order == _id_order) {
            return i;
        }
    }
    return -1;
}

function setPreOrderSumAssign(listData) {
    var listSaveData = [];
    listPreOrdersSumAssign = mainFuntion.preOrderSumAssign_GetAll();
    for (var i = 0; i < listData.length; i++) {
        var listData_Sub = [];
        var listAssign = [];
        var sumTon = 0;

        //lấy danh sách đơn hàng có địa chỉ, số trip giống nhau, tổng tấn để gán vào trong sum
        listAssign.push(Number(i));
        for (var j = i + 1; j < listData.length; j++) {
            if (listData[j]._trip == listData[i]._trip
                && listData[j]._id_delivery === listData[i]._id_delivery
                && listData[j]._id_warehouse === listData[i]._id_warehouse
                && listData[j]._eta === listData[i]._eta
                && listData[j]._etd === listData[i]._etd) {
                listAssign.push(Number(j));
                sumTon += Number(listData[j]._ton);

                listData_Sub.push(listData[j]);
                listData.splice(j, 1);
                j--;
            }
        }

        // console.log('158', listAssign, sumTon);

        //Kiểm tra trong sum assign xem cái nào có cùng thông tin, lấy số ton
        var listCheckSumTon = [];
        for (var j = 0; j < listPreOrdersSumAssign.length; j++) {
            if (listData[i]._id_delivery === listPreOrdersSumAssign[j]._id_delivery
                && listData[i]._id_warehouse === listPreOrdersSumAssign[j]._id_warehouse
                && listData[i]._eta === listPreOrdersSumAssign[j]._eta
                && listData[i]._etd === listPreOrdersSumAssign[j]._etd
                && listData[i]._type_product === listPreOrdersSumAssign[j]._type_product
                && listPreOrdersSumAssign[j]._is_enabled
                && listPreOrdersSumAssign[j]._trip === undefined) {
                listCheckSumTon.push({index: j, ton: Math.abs(listPreOrdersSumAssign[j]._ton_for_vehicle - sumTon)});
            }
        }

        console.log('179', listCheckSumTon);

        if (listCheckSumTon.length > 0) {
            //Nếu số ton có độ chênh lệch nhỏ nhất đối với sum, thì chọn cái đó, gán thông tin
            var minTon = listCheckSumTon[0];
            for (var j = 0; j < listCheckSumTon.length; j++) {
                if (listCheckSumTon[j].ton < minTon.ton) {
                    minTon = listCheckSumTon[j];
                }
            }

            console.log(minTon);

            //lấy được giá trị độ chênh lệch nhỏ nhất, set thông tin cho sum assign
            listPreOrdersSumAssign[minTon.index]._ton_real = sumTon;
            listPreOrdersSumAssign[minTon.index]._trip = listData[i]._trip;
            PreOrderSumAssignRoutes.updateTonTrip(listPreOrdersSumAssign[minTon.index]);

            listData_Sub.push(listData[i]);

            //gán _pre_sum_assign_time cho PreOrderAssign
            for (var j = 0; j < listData_Sub.length; j++) {
                listData_Sub[j]._pre_sum_assign_time = listPreOrdersSumAssign[minTon.index]._pre_sum_assign_time;
                listSaveData.push(listData_Sub[j]);
            }
        }
        else {
            console.log('báo lỗi không có đơn hàng nào được phân công');
            console.log('báo lỗi đơn hàng đã được phân công.');
        }

        listData.splice(i, 1);
        i--;
    }

    if(listSaveData.length > 0)
    {
        PreOrderAssign.insertMany(listSaveData, function (err, docs) {
            if (err) {
                console.log('Error!');
            }
            else {
                console.log('PreOrdersAssign created!');
            }
        });
    }
}

router.getPreOrderAssignByTrip = function (trip) {
    PreOrderAssign.find({
        _trip: trip,
        _is_enabled: true
    }).select().exec(function (err, preorderassign) {
        if (err)
            console.error(err);
        else {
            return preorderassign;
        }
    });
};


module.exports = router;