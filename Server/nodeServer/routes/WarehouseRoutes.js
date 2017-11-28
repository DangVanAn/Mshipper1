var express = require('express');
var router = express.Router();
var Warehouse = require('../models/Warehouse');
var mainFuntion = require('./MainFuntions');

router.get('/getall', function (req, res) {
    res.status(200).send(mainFuntion.warehouse_GetAll());
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
                        mainFuntion.warehouse_Add(req.body);
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
    var listData = req.body;
    console.log(listData.length);

    var listWarehouseExist = '';

    var listWarehouse = mainFuntion.warehouse_GetAll();

    for (var i = 0; i < listWarehouse.length; i++) {
        for (var j = 0; j < listData.length; j++) {
            if (listWarehouse[i]._id_warehouse === listData[j]._id_warehouse) {
                listWarehouseExist += ' ' + listData[j]._id_warehouse;
            }
        }
    }

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
                mainFuntion.warehouse_Adds(listData);
                res.status(200).send('Warehouses created!');
                console.log('Warehouses created!');
            }
        });
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
                        mainFuntion.warehouse_SetIsEnable(req.body._id_warehouse, false);
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
    var data = mainFuntion.warehouse_FindByIdWarehouse(req.body.id);
    res.status(200).send(data);
});

router.post('/updatebyid', function (req, res) {
    Warehouse.findOneAndUpdate({_id_warehouse: req.body._id_warehouse}, req.body, function (err, warehouse) {
        if (err)
            return console.error(err);
        else {
            if (warehouse) {
                mainFuntion.warehouse_Update(req.body._id_warehouse, req.body);
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
