var mongoose = require('mongoose');

//User Schema
var devicesSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _delivery_man : {
        type: String,
        required: true
    },
    _name : {
        type: String,
        required: true
    },
    _Imei  : {
        type: String,
        required: true
    },
});


var Devices = mongoose.model('Devices', Schema);

module.exports = Devices;