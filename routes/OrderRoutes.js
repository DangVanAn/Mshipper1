var express = require('express');
var router = express.Router();
var Orders = require('../models/Orders');
var Assign = require('../models/Assign');
var Details = require('../models/Details');

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
//req: {_id_delivery_man}
router.get('/getOrderByIdDeliveryMan', function (req, res) {
    var _id_delivery_man = req.query._id_delivery_man;
    Assign.find({_delivery_man: _id_delivery_man}, function (err, assign) {
        if (err)
            return console.error(err);
        else {
            console.log('Find all Assign!!!');
            Details.find({
                _id: {
                    $in: assign.map(function (a) {
                            return a._id_detail;
                        }
                    )
                }
            }, function (err, details) {
                if (err)
                    return console.error(err);
                else {

                    Orders.find({
                        _id: {
                            $in: details.map(function (a) {
                                    return a._order_id;
                                }
                            )
                        }
                    }, function (err, orders) {
                        if (err)
                            return console.error(err);
                        else {
                            res.status(200).send(orders);
                            console.log('Find all success!!!');
                        }
                    });
                }
            });
        }
    });
});

router.post('/add', function (req, res) {

    var newOrder = new Orders(req.body);


    console.log(newOrder);
    console.log(req.body);

// save
    newOrder.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Order created!');
            console.log('Order created!');
        }
    });
});

router.post('/adds', function (req, res) {

    var newOrders = req.body;
    console.log(newOrders);

    for (var i = 0; i < newOrders.length; i++) {
        console.log(newOrders[i]._id);
        var newOrder = new Orders(newOrders[i]);
        // save
        newOrder.save();
    }

    res.status(200).send('Order created!');

});

module.exports = router;
