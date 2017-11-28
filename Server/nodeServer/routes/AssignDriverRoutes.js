var express = require('express');
var router = express.Router();

var AssignDriver = require('../models/AssignDriver');
var mainFuntion = require('../routes/MainFuntions');

router.post('/getall', function (req, res) {
    var data = mainFuntion.assignDriver_GetAll();
    res.status(200).send(data);
});

router.post('/getbydriver', function (req, res) {
    var data = mainFuntion.assignDriver_GetByDriver(req.body._driver);
    res.status(200).send({success: true, message: "OK", data: JSON.stringify(data)});
});

router.post('/getbypresumassigntime', function (req, res) {
    var data = mainFuntion.assignDriver_GetByPreSumAssignTime(req.body._pre_sum_assign_time);
    res.status(200).send({success: true, message: "OK", data: JSON.stringify(data)});
});

router.post('/add', function (req, res) {
    AssignDriver.insertMany(req.body, function (err, docs) {
        if (err) {
            res.status(200).send('error!');
            console.log('error!');
        }
        else {
            res.status(200).send('created!');
            console.log('created!');
            mainFuntion.assignDriver_Add(req.body);
        }
    });
});

router.post('/updatebysumassign', function (req, res) {
    var timeNow = new Date().getTime();
    var note = 'change driver';
    var count = 0;
    var number = 0;
    AssignDriver.find({
        _pre_sum_assign_time: req.body._pre_sum_assign_time,
        _is_enabled: true
    }, function (err, assigndriver) {
        if (err)
            return console.error(err);
        else {
            number = assigndriver.length;
            if (number > 0) {
                for (var i = 0; i < number; i++) {
                    assigndriver[i]._is_enabled = false;
                    assigndriver[i]._time_cancel = timeNow;
                    assigndriver[i]._note_cancel = note;
                    assigndriver[i].save(function (err) {
                        if (err)
                            console.error(err);
                        else {
                            count++;
                            insert();
                            console.log('delete driver done!');
                        }
                    });
                }
            }
            else {
                insert()
            }

        }
    });

    function insert() {
        if (count === number) {
            mainFuntion.assignDriver_Cancel(req.body._pre_sum_assign_time, false, timeNow, note);

            AssignDriver.insertMany(req.body.data, function (err, docs) {
                if (err) {
                    res.status(200).send('error!');
                    console.log('error!');
                }
                else {
                    res.status(200).send('updated!');
                    console.log('90 - updated!');
                    mainFuntion.assignDriver_Adds(req.body.data);
                }
            });
        }
    }
});

router.post('/getallinfo', function (req, res) {
    var listTrip = mainFuntion.assignDriver_GetAllInfo(req.body._id);

    res.status(200).send({success: true, message: "OK", data: JSON.stringify(listTrip)});
});

router.post('/gettrip', function (req, res) {
    var listTrip = mainFuntion.assignDriver_GetTrip(req.body._id);

    res.status(200).send({success: true, message: "OK", data: JSON.stringify(listTrip)});
});

router.setAssignDriverEnabledFalse = function (_pre_sum_assign_time) {
    AssignDriver.find({_pre_sum_assign_time: _pre_sum_assign_time}).select().exec(function (err, assigndriver) {
        if (err)
            return console.error(err);
        else {
            if (assigndriver.length > 0) {
                mainFuntion.assignDriver_SetIsEnable(_pre_sum_assign_time, false);
                for (var i = 0; i < assigndriver.length; i++) {
                    assigndriver[i]._is_enabled = false;
                    assigndriver[i].save(function (err) {
                        if (err)
                            console.error(err);
                        else {

                            console.log('set sum assign driver _is_enabled = false success');
                        }
                    });
                }
            }
        }
    });
};

module.exports = router;