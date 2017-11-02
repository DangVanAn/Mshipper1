var express = require('express');
var HashMap = require('hashmap');
const uuidv1 = require('uuid/v1');
var router = express.Router();

var PreOrderAssign = require('../models/PreOrdersAssign');
var PreOrder = require('../models/PreOrders');
var preOrderSumRoute = require('../routes/PreOrderSumRoutes');

var hashmap = new HashMap();

router.post('/getall', function (req, res) {
    res.status(200).send(listPreOrdersAssign);
});

getLitsPreOrderSum();
getLitsPreOrder();
getLitsPreOrderAssign();

var listNewOrdersAssign = [];
var listPreOrders = [];
var listPreOrdersAssign = [];
var listPreOrdersSum = [];

function getLitsPreOrder() {
    PreOrder.find({}, function (err, preorders) {
        if (err)
            return console.error(err);
        else {
            listPreOrders = [];
            for (var i = 0; i < preorders.length; i++) {
                hashmap.set(preorders[i]._id_order, preorders[i]);
                listPreOrders.push(preorders[i]);
            }
            console.log('LitsPreorders', preorders.length);
        }
    });
}

function getLitsPreOrderAssign() {
    PreOrderAssign.find({}, function (err, preordersassign) {
        if (err)
            return console.error(err);
        else {
            listPreOrdersAssign = [];
            for (var i = 0; i < preordersassign.length; i++) {
                hashmap.set(preordersassign[i]._id_order + "assign", preordersassign[i]);
                listPreOrdersAssign.push(preordersassign[i]);
            }
            console.log('LitsPreordersAssign', preordersassign.length);
        }
    });
}

function getLitsPreOrderSum() {
    listPreOrdersSum = preOrderSumRoute.getListPreOrderSum();
    console.log('99', listPreOrdersSum.length);
}

router.post('/posthandling', function (req, res) {
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
                PreOrder.deleteOne({_id_order: req.body[i]._id_order}, function (err) {
                    if (err) {
                    }
                    else {
                        console.log('Delete', req.body[i]._id_order, 'done!');
                    }
                });

                var index = findIdOrder(req.body[i]._id_order);
                if (index > -1) {
                    console.log('315 vi tri index:', index);
                    listPreOrdersAssign.splice(index, 1);
                }
                hashmap.set(req.body[i]._id_order, req.body[i]);
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
            hashmap.set(req.body[i]._id_order, req.body[i]);
            listNewOrdersAssign.push(req.body[i]);
            listPreOrdersAssign.push(req.body[i]);
        }
    }

    res.status(200).send('Xử Lý Thành Công');

    console.log('sau khi xử lý!, còn chạy được không?');

    PreOrder.insertMany(listNewOrdersAssign, function (err, docs) {
        if (err) {
            // res.status(200).send('Error!');
            console.log('Error!');
        }
        else {
            // res.status(200).send('PreOrders created!');
            console.log('PreOrders created!');
            // getLitsPreOrder();
            createPreOrderReport();
        }
    });
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
}


module.exports = router;