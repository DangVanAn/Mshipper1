var express = require('express');
var router = express.Router();

var PreOrderList = require('../models/PreOrdersList');

var listPreOrdersList = [];

resetPreOrderList();
function resetPreOrderList() {
    PreOrderList.find({}, function (err, data) {
        if (err) {
            console.log('error!');
        }
        else {
            listPreOrdersList = data;
            console.log('get all preorderlist!');
        }
    });
}

router.post('/getall', function (req, res) {
    res.status(200).send(listPreOrdersList);
});

router.post('/add', function (req, res) {
    var data = new PreOrderList(req.body);
    var create_time = new Date().getTime();
    data._create_time = create_time;

    data.save(function (err) {
        if (err)
        {
            res.status(200).send('error!');
            console.log('error!')
        }
        else {
            res.status(200).send(create_time.toString());
            console.log('added');
        }
    });
});

module.exports = router;