var express = require('express');
var router = express.Router();
var Details = require('../models/Details');
var Orders = require('../models/Orders');

var statusDetail = ["Hoàn thành", "Hủy", "Đang vận chuyển"];
var statusOrder = ["Hoàn thành", "Hủy", "Đang vận chuyển", "Chưa phân công"];

router.get('/getall', function (req, res) {
    Details.find({}, function (err, details) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(details);
            console.log('Find all success!!!');
        }
    });
});

router.post('/add', function (req, res) {

    var newDetails = new Details(req.body);
    console.log(newDetails);
    console.log(req.body);

    newDetails.save(function (err) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send('Details created!');
            console.log('Details created!');
        }
    });
});

router.post('/adds', function (req, res) {

    console.log(req.body);

    for (var i = 0; i < req.body.length; i++) {
        console.log(req.body[i]._order_id);
        var newDetails = new Details(req.body[i]);
        // save
        newDetails.save();
    }

    res.status(200).send('Order created!');
});

router.post('/getbyidorder', function (req, res) {
    console.log(req);
    console.log(req.body);
    console.log(req.body._id);
    //get
    Details.find({_order_id: req.body._id}, function (err, details) {
        if (err) {
            res.status(200).send(repHttp(false, err));
            return console.error(err);
        }
        else {
            res.status(200).send(details);
            console.log('Find one success!!! ' + details.length);
        }
    });
});

router.post('/updateStatus', function (req, res) {
    console.log(req.query._list_detail);
    var countDetails = 0;
    var _list_detail = JSON.parse(req.query._list_detail);

    function updateOrder(details) {
        Details.find({_order_id: details[0]._order_id}, function (err, details) {
            if (err) {
                res.status(200).send(repHttp(false, err));
                return console.error(err);
            }
            else {
                var demCancel = 0, demComplete = 0;
                for (var i = 0; i < details.length; i++) {
                    if (details[i]._status !== statusDetail[0] && details[i]._status !== statusDetail[1]) {
                        res.status(200).send(repHttp(true, JSON.stringify(details)));
                        console.log('Details successfully updated!');
                        return;
                    }
                    if (details[i]._status === statusDetail[1]) {
                        demCancel++;
                    }
                    if (details[i]._status === statusDetail[0]) {
                        demComplete++;
                    }
                }
                if (demCancel + demComplete === details.length) {
                    Orders.findOne({_id: details[0]._order_id}).select().exec(function (err, order) {
                        if (err) {
                            res.status(200).send(repHttp(false, err));
                            return console.error(err);
                        }
                        else {
                            order._order_status = demCancel === details.length ? statusOrder[1] : statusOrder[0];
                            order.save(function (err) {
                                if (err) {
                                    res.status(200).send(repHttp(false, err));
                                    return console.error(err);
                                }
                                else {
                                    res.status(200).send(repHttp(true, JSON.stringify(details)));
                                    console.log('Order and details successfully updated!');
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    function updateDetail(details) {
        if (countDetails === details.length) {
            updateOrder(details);
            return;
        }
        details[countDetails]._status = _list_detail[0]._status;
        details[countDetails]._note = _list_detail[0]._note;
        details[countDetails]._latitude_update = _list_detail[0]._latitude_update;
        details[countDetails]._longitude_update = _list_detail[0]._longitude_update;
        details[countDetails]._delivery_daytime = _list_detail[0]._delivery_daytime;
        if (_list_detail[0]._pay_type !== "")
            details[countDetails]._pay_type = _list_detail[0]._pay_type;

        details[countDetails].save(function (err) {
            if (err) {
                res.status(200).send(repHttp(false, err));
                return console.error(err);
            }
            else {
                countDetails++;
                updateDetail(details);
            }
        });
    }

    try {
        Details.find({
            _id_package: {
                $in: _list_detail.map(function (a) {
                        return a._id_package;
                    }
                )
            }
        }, function (err, details) {
            if (err) {
                res.status(200).send(repHttp(false, err));
                return console.error(err);
            }
            else {
                updateDetail(details);
            }
        });
    }
    catch (err) {
        return console.log(err.getMessage());
    }
});


module.exports = router;
