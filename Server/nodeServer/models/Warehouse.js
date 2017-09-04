var mongoose = require('mongoose');

//User Schema
var warehouseSchema = mongoose.Schema({
    _id_warehouse : {
        type: String,
        required: true
    },
    _name : {
        type: String,
    },
    _address : {
        type: String,
    },
    _polygon : {
        type: String,
    },
    _latitude : {
        type: String,
    },
    _longitude : {
        type: String,
    },
    _radius : {
        type: Number,
    },
    _note : {
        type: String,
    },
    _is_enabled : {
        type: Boolean,
    }
});


var Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;