var mongoose = require('mongoose');

//Schema
var PreOrderSumAssignDriverSchema = mongoose.Schema({
    _id_pre_sum_assign : {
        type: String,
    },
    _driver : {
        type: String,
    },
    _name_driver : {
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


var PreOrderSumAssignDriver = mongoose.model('PreOrderSumAssignDriverSchema', PreOrderSumAssignDriverSchema);

module.exports = PreOrderSumAssignDriver;