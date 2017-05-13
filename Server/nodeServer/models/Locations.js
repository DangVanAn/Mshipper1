var mongoose = require('mongoose');

var locationsSchema = mongoose.Schema({
    _latitude : {
        type: String,
        required: true
    },
    _longitude : {
        type: String,
        required: true
    },
    _timestamp  : {
        type: String,
        required: true
    },
    _delivery_man  : {
        type: String,
        required: true
    }
});

var Locations = mongoose.model('Locations', locationsSchema);

module.exports = Locations;