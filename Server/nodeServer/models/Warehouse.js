var mongoose = require('mongoose');

//User Schema
var warehouseSchema = mongoose.Schema({
    _id_area : {
        type: String,
        required: true
    },
    _name_area : {
        type: String,
        required: true
    },
    _address : {
        type: String,
        required: true
    },
    _list_latLng : {
        type: String,
        required: true
    },
    _note : {
        type: String,
        required: true
    },

});


var Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;