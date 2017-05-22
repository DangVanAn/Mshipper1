var mongoose = require('mongoose');

//User Schema
var OrdersSchema = mongoose.Schema({
    _id: {
        type: String,
        },
    _created_date  : {
        type: Number,
    },
    _expected_date  : {
        type: Number,
    },
    _address   : {
        type: String,
    },
    _area_id : {
        type: String,
    },
    _latitude : {
        type: String,
    },
    _longitude  : {
        type: String,
    },
    _order_status  : {
        type: String,
    },
     _note : {  
        type: String,
    }
});


var Orders = mongoose.model('Orders', OrdersSchema);

module.exports = Orders;