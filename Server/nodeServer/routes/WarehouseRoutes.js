var express = require('express');
var router = express.Router();
var Warehouse = require('../models/Warehouse');

router.get('/getall', function (req, res) {
// get all
    Warehouse.find({_is_enabled : true}, function (err, warehouses) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(warehouses);
            console.log('Find all success!!!');
        }
    });
});

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
        Warehouse.findOne({_id_warehouse: listData[index]._id_warehouse
        }).select().exec(function (err, warehouse) {
            if (err)
                return console.error(err);
            else {
                if (warehouse) {
                    listWarehouseExist += ' ' + listData[index]._id_warehouse;
                }
                index++;
                if(index < listData.length) {
                    findFuntion(index);
                }
                else{
                    saveFuntion();
                }
            }
        });
    }

    function saveFuntion() {
        if(listWarehouseExist.length > 0) {
            res.status(200).send('Mã kho:' +listWarehouseExist + ' Đã tồn tại');
        }
        else {
            Warehouse.insertMany(listData, function(err, docs) {
                if(err) {
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
            if(warehouse)
            {
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
