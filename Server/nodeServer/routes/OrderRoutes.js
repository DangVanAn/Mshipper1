var express = require('express');
var router = express.Router();
var Orders = require('../models/Orders');

router.get('/getall', function (req, res) {

// get all
    Orders.find({}, function (err, orders) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(orders);
            console.log('Find all success!!!');
        }
    });
});

module.exports = router;
