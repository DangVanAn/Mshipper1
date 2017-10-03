var mongoose = require('mongoose');

//User Schema
var productSchema = mongoose.Schema({
    _name : {
        type: String,
    },
    _owner : {
        type: String,
    },
    _weigh : {
        type: Number,
    },
    _volume : {
        type: Number,
    },
    _number_plate : {
        type: String,
    },
    _note : {
        type: String,
    },
    _name_driver : {
        type: String,
    },
    _id_driver : {
        type: String,
    },
    _is_enabled : {
        type: Boolean,
    }
});


var Vehicle = mongoose.model('Vehicle', productSchema);

module.exports = Vehicle;