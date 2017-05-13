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

    for(var i = 0; i < newOrders.length; i++)
    {
        console.log(newOrders[i]._id);
        var newOrder = new Orders(newOrders[i]);
        // save
        newOrder.save();
    }

    res.status(200).send('Order created!');

});

module.exports = router;
