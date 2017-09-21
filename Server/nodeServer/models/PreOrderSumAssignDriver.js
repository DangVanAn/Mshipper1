var mongoose = require('mongoose');

//Schema
var PreOrderSumAssignDriverSchema = mongoose.Schema({
    _pre_sum_assign_time : {
        type: Number,
    },
    _driver : {
        type: String,
    },
    _name_driver : {
        type: String,
    },
    _phone_driver : {
        type: String,
    },
    _driver_accept : {
        type: Number,
    },
    _lead_driver : {
        type: Boolean,
    },
    _is_enabled : {
        type: Boolean,
    }
});


var PreOrderSumAssignDriver = mongoose.model('PreOrderSumAssignDrivers', PreOrderSumAssignDriverSchema);

module.exports = PreOrderSumAssignDriver;