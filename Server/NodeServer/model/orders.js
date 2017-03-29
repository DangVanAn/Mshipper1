var mongoose = require('mongoose');

//User Schema
var OrdersSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _order_date  : {
        type: Date,
        required: true
    },
    _expected_datetime  : {
        type: Date,
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
        type: Number,
        required: true
    },
    _longitude  : {
        type: Number,
        required: true
    },
    _order_status  : {
        type: String,
        required: true
    },
     _delivery_type  : {
        type: String,
        required: true
    },
     _note : {  
        type: String,
        required: true
    },
});


var Orders = mongoose.model('Orders', OrdersSchema);

module.exports = Orders;