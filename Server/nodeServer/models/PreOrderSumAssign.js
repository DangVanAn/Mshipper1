var mongoose = require('mongoose');

//Schema
var PreOrderSumAssignSchema = mongoose.Schema({
    _id_pre_sum : {
        type: String,
    },
    _drivers : {
        type: String,
    },
    _name_drivers : {
        type: String,
    },
    _number_plate : {
        type: String,
    },
    _ton_for_vehicle : {
        type: Number,
    },
    _weigh_for_vehicle : {
        type: Number,
    },
    _is_enabled : {
        type: Boolean,
    }
});


var PreOrderSumAssign = mongoose.model('PreOrderSumAssign', PreOrderSumAssignSchema);

module.exports = PreOrderSumAssign;