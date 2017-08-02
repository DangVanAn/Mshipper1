var mongoose = require('mongoose');

//User Schema
var OrdersSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _created_date  : {
        type: Number,
        required: true
    },
    _expected_date  : {
        type: Number,
        required: true
    },
    _address   : {
        type: String,
        required: true
    },
    _area_id : {
        type: String,
        required: true
    },
    _latitude : {
        type: String,
        required: true
    },
    _longitude  : {
        type: String,
        required: true
    },
    _order_status  : {
        type: String,
        required: true
    },
     _note : {  
        type: String,
    }
});


var Orders = mongoose.model('Orders', OrdersSchema);

module.exports = Orders;