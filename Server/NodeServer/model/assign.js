var mongoose = require('mongoose');

//User Schema
var assignSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _order_id : {
        type: String,
        required: true
    },
    _assign_man : {
        type: String,
        required: true
    },
    _delivery_man  : {
        type: String,
        required: true
    },
    _datetime : {
        type: Date,
        required: true
    },
    _status : {
        type: String,
        required: true
    },
    _note : {
        type: String,
        required: true
    },
});


var Assign = mongoose.model('Assign', assignSchema);

module.exports = Assign;