var express = require('express');
var HashMap = require('hashmap');
const uuidv1 = require('uuid/v1');
var router = express.Router();

var PreOrder = require('../models/PreOrders');
var Warehouse = require('../models/Warehouse');
var ProductGroup = require('../models/ProductGroup');
var Product = require('../models/Product');
var PreOrderSum = require('../models/PreOrderSum');
var PreOrderSumAssign = require('../models/PreOrderSumAssign');
var preOrderSumRoute = require('../routes/PreOrderSumRoutes');

var hashmap = new HashMap();

router.post('/getall', function (req, res) {
// get all
//     PreOrder.find({}, function (err, preorders) {
//         if (err)
//             return console.error(err);
//         else {
//             res.status(200).send(preorders);
//             console.log('Find all success!!!');
//         }
//     });

    res.status(200).send(listPreOrders);
});

getLitsProductGroup();
getLitsProduct();
getLitsWarehouse();
getLitsPreOrder();

function getLitsProductGroup() {
    ProductGroup.find({_is_enabled: true}, function (err, productgroups) {
        if (err)
            return console.error(err);
        else {
            for (var i = 0; i < productgroups.length; i++) {
                hashmap.set(productgroups[i]._id_product_group, productgroups[i]);
            }
            console.log('LitsProductGroup', productgroups.length);
        }
    });
}

function getLitsProduct() {
    Product.find({_is_enabled: true}, function (err, products) {
        if (err)
            return console.error(err);
        else {
            for (var i = 0; i < products.length; i++) {
                hashmap.set(products[i]._id_product, products[i]);
            }

            console.log('LitsProduct', products.length);
        }
    });
}

function getLitsWarehouse() {
    Warehouse.find({_is_enabled: true}, function (err, warehouses) {
        if (err)
            return console.error(err);
        else {
            for (var i = 0; i < warehouses.length; i++) {
                hashmap.set(warehouses[i]._id_warehouse, warehouses[i]);
            }

            console.log('LitsWarehouse', warehouses.length);
        }
    });
}

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

var listPreOrdersSum = [];
function getLitsPreOrderSum() {
    listPreOrdersSum = preOrderSumRoute.getListPreOrderSum();
    console.log('99', listPreOrdersSum.length);
}

var preOrderReport = [];
function createPreOrderReport() {
    getLitsPreOrderSum();
    preOrderReport = [];
    var preOrderSumNew = [];
    console.log('95', listPreOrders.length);
    for (var i = 0; i < listPreOrders.length; i++) {
        var data = {
            _id_warehouse: listPreOrders[i]._id_warehouse,
            _address_warehouse: addressWarehouse(listPreOrders[i]._id_warehouse),
            _id_delivery: listPreOrders[i]._id_delivery,
            _address_delivery: listPreOrders[i]._address,
            _id_customer: listPreOrders[i]._id_customer,
            _type_product: listPreOrders[i]._type_product,
            _ton: listPreOrders[i]._ton,
            _etd: listPreOrders[i]._etd,
            _eta: listPreOrders[i]._eta,
            _id_delivery_manager: listPreOrders[i]._id_delivery_manager,
            _time_send : new Date().getTime(),
            _pre_sum_time : uuidv1(),
            _is_enabled : true
        };

        if (i === 0) {
            preOrderReport.push(data);
        }
        else {
            var index = checkExistPreOrderReport(data, preOrderReport);
            if (index !== -1) {
                preOrderReport[index]._ton = Number(preOrderReport[index]._ton) + Number(data._ton);
            }
            else {
                preOrderReport.push(data);
            }
        }
    }

    for(var i = 0; i < preOrderReport.length; i++)
    {
        var boolCheck = [];
        for(var j = 0; j < listPreOrdersSum.length; j++)
        {
            //kiểm tra có giống cái cũ không
            if(listPreOrdersSum[j]._is_enabled === true && comparePreOrderSum(preOrderReport[i], listPreOrdersSum[j])){
                boolCheck.push(j);
            }
        }
        if(boolCheck.length > 0){
            //Giống --> kiểm tra xem có khác _ton không.
            var sumTonInSum = 0;
            for(var ii = 0; ii < boolCheck.length; ii++)
            {
                sumTonInSum += listPreOrdersSum[boolCheck[ii]]._ton;
            }
            if(preOrderReport[i]._ton != sumTonInSum){
                //Cập nhật lại _ton
                if(preOrderReport[i]._ton > sumTonInSum){
                    //trong trường hợp lớn hơn thì tạo một cái mới bằng phần lớn hơn
                    console.log(preOrderReport[i]._ton, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', sumTonInSum);
                    preOrderReport[i]._ton -= sumTonInSum;
                    preOrderSumNew.push(preOrderReport[i]);
                    //kiểm tra xem preOrderSum đã được Assign chưa
                    // if(listPreOrdersSum[boolCheck]._time_accept === undefined){
                    //     preOrderSumNew.push(preOrderReport[i]);
                    //     console.log('171', listPreOrdersSum[boolCheck]);
                    //     listPreOrdersSum[boolCheck]._time_update = new Date().getTime();
                    //     listPreOrdersSum[boolCheck]._note_update = "sum higher before accept";
                    //     listPreOrdersSum[boolCheck]._is_enabled = false;
                    //     PreOrderSum.findOneAndUpdate({ _pre_sum_time:  listPreOrdersSum[boolCheck]._pre_sum_time }, listPreOrdersSum[boolCheck], function (err, preodersum) {
                    //         if (err)
                    //             return console.error(err);
                    //         else {
                    //             console.log('preodersum successfully updated!');
                    //         }
                    //     });
                    // }
                    // else {
                    //     //trong trường hợp đã accept thì tạo một cái mới
                    //     preOrderReport[i]._ton -= listPreOrdersSum[boolCheck]._ton;
                    //     preOrderSumNew.push(preOrderReport[i]);
                    // }
                }
                else {
                    //tạm thời không xét trường hợp nhỏ hơn, vì logic
                    //trong trường hợp nhỏ hơn, thì tạo một cái mới và hủy cái cũ, đồng thời gán xe từ bên cũ chuyển qua bên mới
                    // console.log(preOrderReport[i]._ton, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', listPreOrdersSum[boolCheck]._ton)
                    // var preSumTimeNew = preOrderReport[i]._pre_sum_time;
                    // var preSumTimeOld = 0;
                    // PreOrderSum.findOne({ _pre_sum_time:  listPreOrdersSum[boolCheck]._pre_sum_time}, function (err, preodersum) {
                    //     if (err)
                    //         return console.error(err);
                    //     else {
                    //         preodersum._is_enabled = false;
                    //         preodersum._time_update = new Date().getTime();
                    //         preodersum._note_update = "sum lower";
                    //         preSumTimeOld = preodersum._pre_sum_time;
                    //
                    //         preodersum.save(function (err) {
                    //             if (err)
                    //                 return console.error(err);
                    //             else {
                    //                 console.log('158 - save preordersum!');
                    //                 preOrderSumNew.push(preOrderReport[i]);
                    //
                    //                 //cập nhật lại xe đã assign vào preordersum mới
                    //                 PreOrderSumAssign.find({_pre_sum_time : preSumTimeOld}, function (err, preordersumassign) {
                    //                     if (err)
                    //                         return console.error(err);
                    //                     else {
                    //                         for(var ii = 0; ii < preordersumassign.length; ii++){
                    //                             preordersumassign[ii]._pre_sum_time = preSumTimeNew;
                    //                             preordersumassign[ii].save(function (err) {
                    //                                 if (err)
                    //                                     return console.error(err);
                    //                                 else {
                    //                                     console.log('200 save ok');
                    //                                 }
                    //                             });
                    //                         }
                    //                     }
                    //                 });
                    //             }
                    //         });
                    //     }
                    // });
                }
            }
        }
        else {
            //Khác, chưa có trong dữ liệu, thì tổng hợp lại thành list, sau đó lưu lại sau.
            preOrderSumNew.push(preOrderReport[i]);
        }
    }

    if(preOrderSumNew.length > 0)
    {
        preOrderSumRoute.insertPreOrderSum(preOrderSumNew);
    }
    return true;
}

function comparePreOrderSum(x, y) {
    if(x._id_warehouse != y._id_warehouse) return false;
    if(x._address_warehouse != y._address_warehouse) return false;
    if(x._id_delivery != y._id_delivery) return false;
    if(x._address_delivery != y._address_delivery) return false;
    if(x._id_customer != y._id_customer) return false;
    if(x._type_product != y._type_product) return false;
    if(x._etd != y._etd) return false;
    if(x._eta != y._eta) return false;
    if(x._id_delivery_manager != y._id_delivery_manager) return false;

    return true;
}

function addressWarehouse(id) {
    var warehouse = hashmap.get(id);
    if (warehouse != undefined) {
        return warehouse._address;
    }
    return "none";
}

function checkExistPreOrderReport(data, preOrderReport) {

    for (var i = 0; i < preOrderReport.length; i++) {
        var y = preOrderReport[i];
        if (data._id_warehouse == y._id_warehouse &&
            data._address_warehouse == y._address_warehouse &&
            data._id_delivery == y._id_delivery &&
            data._address_delivery == y._address_delivery &&
            data._id_customer == y._id_customer &&
            data._type_product == y._type_product &&
            data._etd == y._etd) {
            return i;
        }
    }
    return -1;
}

var listProductNotInData = [];
var listProductGroupNotInData = [];
var listWarehouseNotInData = [];
var listNewOrders = [];
var listPreOrders = [];
router.post('/posthandling', function (req, res) {

    listProductNotInData = [];
    listProductGroupNotInData = [];
    listWarehouseNotInData = [];
    listNewOrders = [];

    console.log(req.body.length);
    for (var i = 0; i < req.body.length; i++) {
        //Kiểm tra xem đơn hàng có trong preOrders không.
        var getOrderHashmap = hashmap.get(req.body[i]._id_order);
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
                    listPreOrders.splice(index, 1);
                }
                hashmap.set(req.body[i]._id_order, req.body[i]);
                listNewOrders.push(req.body[i]);
                listPreOrders.push(req.body[i]);
            }
            else {
                //Đã tồn tại, không thay đổi.
                // console.log(i, 'không thay đổi');
            }
        }
        else {
            //Chưa tồn tại thì lưu vào trong hash tiếp, tạo một danh sách cho những trường hợp update, tạo mới này.
            hashmap.set(req.body[i]._id_order, req.body[i]);
            listNewOrders.push(req.body[i]);
            listPreOrders.push(req.body[i]);
        }

        if (hashmap.get(req.body[i]._id_warehouse) == undefined) {
            if (listWarehouseNotInData.indexOf(req.body[i]._id_warehouse) === -1) {
                listWarehouseNotInData.push(req.body[i]._id_warehouse);

            }
        }
    }

    for (var i = 0; i < listWarehouseNotInData.length; i++) {
        console.log(i, 'warehouse', listWarehouseNotInData[i], 'notInData');
    }

    res.status(200).send('Xử Lý Thành Công');

    console.log('sau khi xử lý!, còn chạy được không?');

    PreOrder.insertMany(listNewOrders, function (err, docs) {
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

router.post('/add', function (req, res) {

    Warehouse.findOne({
        _id_warehouse: req.body._id_warehouse
    }).select().exec(function (err, warehouse) {
        if (err)
            return console.error(err);
        else {
            if (!warehouse) {
                var newWarehouse = new Warehouse(req.body);
                console.log(newWarehouse);

                newWarehouse.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send('Warehouse created!');
                        console.log('Warehouse created!');
                    }
                });
            }
            else {
                res.status(200).send("Mã kho đã tồn tại!");
            }
        }
    });
});


router.post('/adds', function (req, res) {

    // console.log(req.body);
    var listData = req.body;
    console.log(listData.length);

    var index = 0;
    var listWarehouseExist = '';

    findFuntion(index);

    function findFuntion(index) {
        Warehouse.findOne({
            _id_warehouse: listData[index]._id_warehouse
        }).select().exec(function (err, warehouse) {
            if (err)
                return console.error(err);
            else {
                if (warehouse) {
                    listWarehouseExist += ' ' + listData[index]._id_warehouse;
                }
                index++;
                if (index < listData.length) {
                    findFuntion(index);
                }
                else {
                    saveFuntion();
                }
            }
        });
    }

    function saveFuntion() {
        if (listWarehouseExist.length > 0) {
            res.status(200).send('Mã kho:' + listWarehouseExist + ' Đã tồn tại');
        }
        else {
            Warehouse.insertMany(listData, function (err, docs) {
                if (err) {
                    res.status(200).send('Error!');
                    console.log('Error!');
                }
                else {
                    res.status(200).send('Warehouses created!');
                    console.log('Warehouses created!');
                }
            });
        }
    }
});

router.post('/delete', function (req, res) {

    PreOrder.remove({_id_order: req.body._id_order}, function (err) {
        if (err) {
            res.status(200).send('error');
            console.log('error!');
        }
        else {
            var index = findIdOrder(req.body._id_order);
            if (index > -1) {
                listPreOrders.splice(index, 1);
            }
            var bool = createPreOrderReport();
            if (bool) res.status(200).send('removed');
            console.log('Preorder removed!');
        }
    });
});

router.post('/update', function (req, res) {
    PreOrder.findOne({_id_order: req.body._id_order})
        .select().exec(function (err, preorder) {
        if (err) {
            res.status(200).send('error');
            console.log('error!');
        }
        else {
            if (preorder) {
                //Kiểm tra các thành phần có cho phép hay không
                preorder._id_delivery = req.body._id_delivery;
                preorder._id_customer = req.body._id_customer;
                preorder._address = req.body._address;
                preorder._id_warehouse = req.body._id_warehouse;
                preorder._id_product = req.body._id_product;
                preorder._name_product = req.body._name_product;
                preorder._id_product_group = req.body._id_product_group;
                preorder._type_product = req.body._type_product;
                preorder._number = req.body._number;
                preorder._ton = req.body._ton;
                preorder._etd = req.body._etd;
                preorder._eta = req.body._eta;
                preorder._etd_long = req.body._etd_long;
                preorder._eta_long = req.body._eta_long;

                preorder.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        var index = findIdOrder(req.body._id_order);
                        if (index > -1) {
                            listPreOrders[index] = req.body;
                        }
                        var bool = createPreOrderReport();
                        if (bool) res.status(200).send('updated');
                        console.log('updated');

                    }
                });
            }
            else {
                res.status(200).send('error');
                console.log('error!');
            }
        }
    });
});

function findIdOrder(_id_order) {
    for (var i = 0; i < listPreOrders.length; i++) {
        if (listPreOrders[i]._id_order == _id_order) {
            return i;
        }
    }
}

router.post('/remove', function (req, res) {

    Warehouse.findOne({
        _id_warehouse: req.body._id_warehouse
    }).select().exec(function (err, warehouse) {
        if (err)
            return console.error(err);
        else {
            if (warehouse) {
                warehouse._is_enabled = false;

                warehouse.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send('Warehouse removed!');
                        console.log('Warehouse removed!');
                    }
                });
            }
            else {
                res.status(200).send("Thông tin kho không tồn tại!");
            }
        }
    });
});

router.post('/getbyid', function (req, res) {
    console.log(req.body);

    Warehouse.find({_id_warehouse: req.body.id}, function (err, warehouse) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(warehouse);
            console.log('Find one success!!!');
        }
    }).select('-_token -_hashed_password -_id');
});

router.post('/updatebyid', function (req, res) {
    Warehouse.findOneAndUpdate({_id_warehouse: req.body._id_warehouse}, req.body, function (err, warehouse) {
        if (err)
            return console.error(err);
        else {
            if (warehouse) {
                res.status(200).send('Warehouse successfully updated!');
                console.log('Warehouse successfully updated!');
            }
            else {
                res.status(200).send('Warehouse unsuccessfully updated!');
                console.log('Warehouse unsuccessfully updated!');
            }
        }
    });
});

module.exports = router;