var mongoose = require('mongoose');

var locationsSchema = mongoose.Schema({
    _latitude: {
        type: Number,
        required: true
    },
    _longitude: {
        type: Number,
        required: true
    },
    _timestamp: {
        type: Number,
        required: true
    },
    _delivery_man: {
        type: String,
        required: true
    },
    _number_plate: {
        type: String,
        required: true
    },
    _pre_order_sum_assign: {
        type: String,
        required: true
    }
});

var Locations = mongoose.model('Locations', locationsSchema);

module.exports = Locations;