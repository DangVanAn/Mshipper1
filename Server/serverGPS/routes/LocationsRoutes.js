var express = require('express');
var router = express.Router();
var Locations = require('../models/Locations');


var listVehicleGPS = [];
router.get('/getall', function (req, res) {

// get all
    Locations.find({}, function (err, locations) {
        if (err) {
            res.status(200).send(repHttp(false, err));
            return console.error(err);
        }
        else {
            res.status(200).send(locations);
            console.log('Find all success!!!');
        }
    });
});

router.get('/getrealtime', function (req, res) {
    res.status(200).send(listVehicleGPS);
});

router.post('/postLocation', function (req, res) {
    console.log(req.body);

    try {
        var newLocation = new Locations(req.body);
        newLocation.save(function (err) {
            if (err) {
                res.status(200).send(repHttp(false, err));
                return console.error(err);
            }
            else {
                res.status(200).send(repHttp(true, "Updated location of use"));
                console.log('Location created!');
            }
        });
    }
    catch (err) {
        res.status(200).send(repHttp(false, err.message));
        console.log(err.message);
    }
});

function insertIntoListGPS(data) {
    var index = -1;
    for(var i = 0; i < listVehicleGPS; i++)
    {
        if(listVehicleGPS[i]._delivery_man == data._delivery_man &&
            listVehicleGPS[i]._number_plate == data._number_plate &&
            listVehicleGPS[i]._pre_order_sum_assign == data._pre_order_sum_assign)
        {
            listVehicleGPS[i] = data;
            index = i;
            break;
        }
    }

    if(index === -1){
        listVehicleGPS.push(data);}
}

router.saveLocation = function (data) {
    var tempData = JSON.parse(data);
    console.log(tempData);
    var locations = []
    data._pre_order_sum_assign.forEach(function(element) {
        var locationTemp = {
            _latitude: data._latitude,
            _longitude: data._longitude,
            _timestamp: data._timestamp,
            _delivery_man: data._delivery_man,
            _pre_order_sum_assign: element,
            _number_plate: data._number_plate,
            _trip: data._trip
        }
        locations.push(new Locations(locationTemp));
    }, this);

    Locations.insertMany(locations, function(error, docs) {
        if (err) {
            console.log('Location error!');
        } else {
            console.log('Location created!');
            docs.array.forEach(function(element) {
                insertIntoListGPS(element);
            }, this);
        }
    });
};

module.exports = router;
