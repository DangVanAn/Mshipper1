var express = require('express');
var HashMap = require('hashmap');
var router = express.Router();

var PreOrder = require('../models/PreOrders');
var PreOrderSum = require('../models/PreOrderSum');
var ProductGroup = require('../models/ProductGroup');
var Product = require('../models/Product');

var hashmap = new HashMap();

router.post('/getall', function (req, res) {
// get all
    PreOrderSum.find({}, function (err, preorders) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(preorders);
            console.log('Find all success!!!');
        }
    });
//     res.status(200).send(listPreOrdersSum);
});

router.post('/settimeaccept', function (req, res) {
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
                        console.log('success!')
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

router.post('/settimerefuse', function (req, res) {
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
                        console.log('success!')
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
//
// router.post('/getreport', function (req, res) {
// // get report
//     res.status(200).send(preOrderReport);
// });
//
// var listPreOrdersSum = [];
//
// getListPreOrdersSum();
// function getListPreOrdersSum() {
//     listPreOrdersSum = [];
//     PreOrderSum.find({}, function (err, preordersSum) {
//         if (err)
//             return console.error(err);
//         else {
//             listPreOrdersSum = preordersSum;
//         }
//     });
// }
//
// router.post('/adds', function (req, res) {
//
//     var listData = req.body;
//     console.log(listData.length);
//
//     PreOrderSum.insertMany(listData, function (err, docs) {
//         if (err) {
//             res.status(200).send('error!');
//             console.log('Error!');
//         }
//         else {
//             res.status(200).send('created!');
//             console.log('created!');
//         }
//     });
// });
//
// router.post('/delete', function (req, res) {
//
//     PreOrder.remove({_id_order: req.body._id_order}, function (err) {
//         if (err) {
//             res.status(200).send('error');
//             console.log('error!');
//         }
//         else {
//             var index = findIdOrder(req.body._id_order);
//             if (index > -1) {
//                 listPreOrders.splice(index, 1);
//             }
//             var bool = createPreOrderReport();
//             if(bool) res.status(200).send('removed');
//             console.log('Preorder removed!');
//         }
//     });
// });
//
// router.post('/update', function (req, res) {
//     PreOrder.findOne({_id_order: req.body._id_order})
//         .select().exec(function (err, preorder) {
//         if (err) {
//             res.status(200).send('error');
//             console.log('error!');
//         }
//         else {
//             if (preorder) {
//                 //Kiểm tra các thành phần có cho phép hay không
//                 preorder._id_delivery = req.body._id_delivery;
//                 preorder._id_customer = req.body._id_customer;
//                 preorder._address = req.body._address;
//                 preorder._id_warehouse = req.body._id_warehouse;
//                 preorder._id_product = req.body._id_product;
//                 preorder._name_product = req.body._name_product;
//                 preorder._id_product_group = req.body._id_product_group;
//                 preorder._type_product = req.body._type_product;
//                 preorder._number = req.body._number;
//                 preorder._ton = req.body._ton;
//                 preorder._etd = req.body._etd;
//                 preorder._eta = req.body._eta;
//                 preorder._etd_long = req.body._etd_long;
//                 preorder._eta_long = req.body._eta_long;
//
//                 preorder.save(function (err) {
//                     if (err)
//                         return console.error(err);
//                     else {
//                         var index = findIdOrder(req.body._id_order);
//                         if (index > -1) {
//                             listPreOrders[index] = req.body;
//                         }
//                         var bool = createPreOrderReport();
//                         if(bool) res.status(200).send('updated');
//                         console.log('updated');
//
//                     }
//                 });
//             }
//             else {
//                 res.status(200).send('error');
//                 console.log('error!');
//             }
//         }
//     });
// });
//
// function findIdOrder(_id_order) {
//     for (var i = 0; i < listPreOrders.length; i++) {
//         if (listPreOrders[i]._id_order == _id_order) {
//             return i;
//         }
//     }
// }
//
// router.post('/remove', function (req, res) {
//
//     Warehouse.findOne({
//         _id_warehouse: req.body._id_warehouse
//     }).select().exec(function (err, warehouse) {
//         if (err)
//             return console.error(err);
//         else {
//             if (warehouse) {
//                 warehouse._is_enabled = false;
//
//                 warehouse.save(function (err) {
//                     if (err)
//                         return console.error(err);
//                     else {
//                         res.status(200).send('Warehouse removed!');
//                         console.log('Warehouse removed!');
//                     }
//                 });
//             }
//             else {
//                 res.status(200).send("Thông tin kho không tồn tại!");
//             }
//         }
//     });
// });
//
// router.post('/getbyid', function (req, res) {
//     console.log(req.body);
//
//     Warehouse.find({_id_warehouse: req.body.id}, function (err, warehouse) {
//         if (err)
//             return console.error(err);
//         else {
//             res.status(200).send(warehouse);
//             console.log('Find one success!!!');
//         }
//     }).select('-_token -_hashed_password -_id');
// });
//
// router.post('/updatebyid', function (req, res) {
//     Warehouse.findOneAndUpdate({_id_warehouse: req.body._id_warehouse}, req.body, function (err, warehouse) {
//         if (err)
//             return console.error(err);
//         else {
//             if (warehouse) {
//                 res.status(200).send('Warehouse successfully updated!');
//                 console.log('Warehouse successfully updated!');
//             }
//             else {
//                 res.status(200).send('Warehouse unsuccessfully updated!');
//                 console.log('Warehouse unsuccessfully updated!');
//             }
//         }
//     });
// });

module.exports = router;