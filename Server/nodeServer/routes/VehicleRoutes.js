var express = require('express');
var router = express.Router();
var Vehicle = require('../models/Vehicle');

router.get('/getall', function (req, res) {
// get all
    Vehicle.find({_is_enabled: true}, function (err, vehicles) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(vehicles);
            console.log('Find all success!!!');
        }
    });
});

router.post('/getbyowner', function (req, res) {
    Vehicle.find({_owner: req.body._owner, _is_enabled: true}, function (err, vehicles) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(vehicles);
            console.log('Find success!!!');
        }
    });
});

router.post('/add', function (req, res) {

    Vehicle.insertMany(req.body, function (err, docs) {
        if (err) {
            res.status(200).send('Error!');
            console.log('Error!');
        }
        else {
            res.status(200).send('Vehicles created!');
            console.log('Vehicles created!');
        }
    });

});


router.post('/adds', function (req, res) {

    Vehicle.insertMany(req.body, function (err, docs) {
        if (err) {
            res.status(200).send('Error!');
            console.log('Error!');
        }
        else {
            res.status(200).send('Vehicles created!');
            console.log('Vehicles created!');
        }
    });
});


router.post('/remove', function (req, res) {

    Vehicle.findOne({
        _id: req.body._id
    }).select().exec(function (err, vehicle) {
        if (err){
            res.status(200).send('removed');
            return console.error(err);
        }
        else {
            if (vehicle) {
                vehicle._is_enabled = false;

                vehicle.save(function (err) {
                    if (err)
                        return console.error(err);
                    else {
                        res.status(200).send('removed');
                        console.log('Vehicle removed!');
                    }
                });
            }
            else {
                res.status(200).send("Thông tin loại hàng không tồn tại!");
            }
        }
    });
});

router.post('/getbyid', function (req, res) {
    console.log(req.body);

    Vehicle.find({_id: req.body.id}, function (err, vehicle) {
        if (err)
            return console.error(err);
        else {
            res.status(200).send(vehicle);
            console.log('Find one success!!!');
        }
    }).select('-_token -_hashed_password -_id');
});

router.post('/updatebyid', function (req, res) {
    console.log(req.body);
    Vehicle.findOneAndUpdate({_id: req.body._id}, req.body, function (err, vehicle) {
        if (err){
            res.status(200).send('Vehicle unsuccessfully updated!');
            return console.error(err);
        }
        else {
            if (vehicle) {
                res.status(200).send('updated');
                console.log('Vehicle successfully updated!');
            }
            else {
                res.status(200).send('Vehicle unsuccessfully updated!');
                console.log('Vehicle unsuccessfully updated!');
            }
        }
    });
});

router.getTestVehicle = function () {
    console.log('test gọi hàm vehicle thành công!!');
};

module.exports = router;
