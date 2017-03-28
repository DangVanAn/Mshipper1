var mongoose = require('mongoose');

//User Schema
var locationsSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _latitude : {
        type: Number,
        required: true
    },
    _longitude : {
        type: Number,
        required: true
    },
    _timestamp  : {
        type: Date,
        required: true
    },
    _delivery_man  : {
        type: String,
        required: true
    },
});


var Locations = mongoose.model('Locations', locationsSchema);

module.exports = Locations;