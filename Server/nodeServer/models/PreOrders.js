var mongoose = require('mongoose');

//Schema
var PreOrdersAssignSchema = mongoose.Schema({
    _id_order: {
        type: String,
    },
    _id_delivery  : {
        type: String,
    },
    _id_customer  : {
        type: String,
    },
    _address   : {
        type: String,
    },
    _id_warehouse : {
        type: String,
    },
    _id_product : {
        type: String,
    },
    _name_product : {
        type: String,
    },
    _id_product_group  : {
        type: String,
    },
    _type_product  : {
        type: String,
    },
    _number  : {
        type: Number,
    },
    _ton : {
        type : Number,
    },
    _etd  : {
        type: String,
    },
    _eta  : {
        type: String,
    },
    _etd_long  : {
        type: Number,
    },
    _eta_long  : {
        type: Number,
    },
    _number_plate  : {
        type: String,
    },
    _id_delivery_manager  : {
        type: String,
    },
    _code_file : {
        type: String,
    },
     _note : {  
        type: String,
    }
});


var PreOrdersAssign = mongoose.model('PreOrders', PreOrdersAssignSchema);

module.exports = PreOrdersAssign;