var mongoose = require('mongoose');

//Schema
var AssignDriverSchema = mongoose.Schema({
    _pre_sum_assign_time : {
        type: String,
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
    _time_cancel : {
        type: String,
    },
    _note_cancel : {
        type: String,
    },
    _is_enabled : {
        type: Boolean,
    }
});


var AssignDriver = mongoose.model('AssignDrivers', AssignDriverSchema);

module.exports = AssignDriver;