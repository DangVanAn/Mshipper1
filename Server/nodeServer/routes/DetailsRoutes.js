var express = require('express');
var router = express.Router();
var Details = require('../models/Details');

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
    for(var i = 0; i < req.body.length; i++)
    {
        Details.findOne({_order_id: req.body[i]._order_id, _id_package : req.body[i]._id_package}).select().exec(function (err, detail) {
            if (err) {}
            else {
                if (detail != null) {
                    detail.remove(function (err) {
                        if (err)
                            return console.error(err);
                        else {
                            console.log('detail successfully remove!');
                        }
                    });
                }
                else {}
            }
        });
    }

    for(var i = 0; i < req.body.length; i++)
    {
        console.log(req.body[i]._order_id);
        var newDetails = new Details(req.body[i]);
        // save
        newDetails.save();
    }

    res.status(200).send('Details created!');
});

router.post('/getbyidorder', function (req, res) {

    console.log(req.body);
    console.log(req.body._id);
    //get
    Details.find({_order_id: req.body._id}, function (err, details) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(details);
            console.log('Find one success!!!');
        }
    });
});

module.exports = router;
