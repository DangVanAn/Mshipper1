var mongoose = require('mongoose');

//User Schema
var detailsSchema = mongoose.Schema({
    _id_package : {
        type: String,
        required: true
    },
    _order_id : {
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
    },
    _package_type: {
        type: String,
        required: true
    },
    _delivery_daytime: {
        type: String,
    },
    _latitude_update: {
        type: String,
    },
    _longitude_update: {
        type: String,
    },
    _signature: {
        type: String,
    },
    _status: {
        type: String,
        required: true
    },
    _photo: {
        type: String,
    },
});


var Details = mongoose.model('Details', detailsSchema);

module.exports = Details;