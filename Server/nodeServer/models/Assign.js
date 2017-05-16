var mongoose = require('mongoose');

//User Schema
var assignSchema = mongoose.Schema({
    _id_detail : {
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
        type: Number,
        required: true
    },
    _status : {
        type: String,
    },
    _note : {
        type: String,
    },
});


var Assign = mongoose.model('Assign', assignSchema);

module.exports = Assign;