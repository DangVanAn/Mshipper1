var mongoose = require('mongoose');

//User Schema
var detailsSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _order_id : {
        type: String,
        required: true
    },
    _id_package : {
        type: String,
        required: true
    },
    _total_pay : {
        type: String,
        required: true
    },
    _pay_type  : {
        type: String,
        required: true
    },
    _weight: {
        type: String,
        required: true
    },
    _package_type: {
        type: String,
        required: true
    },
    _delivery_daytime: {
        type: String,
        required: true
    },
    _latitude_update: {
        type: String,
        required: true
    },
    _longitude_update: {
        type: String,
        required: true
    },
    _signature: {
        type: String,
        required: true
    },
    _status: {
        type: String,
        required: true
    },
    _photo: {
        type: String,
        required: true
    },
});


var Details = mongoose.model('Details', detailsSchema);

module.exports = Details;