var express = require('express');
var router = express.Router();
var Warehouse = require('../models/Warehouse');

router.get('/getall', function (req, res) {
// get all
    Warehouse.find({}, function (err, warehouses) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(warehouses);
            console.log('Find all success!!!');
        }
    });
});

router.post('/add', function (req, res) {
    var newWarehouse = new Warehouse(req.body);
    console.log(newWarehouse);
// save
    newWarehouse.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Warehouse created!');
            console.log('Warehouse created!');
        }
    });
});


module.exports = router;
