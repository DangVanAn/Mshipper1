var mongoose = require('mongoose');

//Schema
var PreOrderSumSchema = mongoose.Schema({
    _id_warehouse  : {
        type: String,
    },
    _address_warehouse  : {
        type: String,
    },
    _id_delivery  : {
        type: String,
    },
    _address_delivery  : {
        type: String,
    },
    _type_product   : {
        type: String,
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
     _note : {  
        type: String,
    },
    _id_delivery_manager : {
        type: String,
    },
    _time_send : {
        type: Number,
    },
    _time_accept : {
        type: Number,
    },
    _time_refuse : {
        type: Number,
    },
    _note_accept : {
        type: String,
    },
    _note_refuse : {
        type: String,
    },
    _user_refuse : {
        type: String,
    },
    _user_accept : {
        type: String,
    },
    _is_enabled : {
        type: Boolean,
    },
});


var PreOrderSum = mongoose.model('PreOrderSum', PreOrderSumSchema);

module.exports = PreOrderSum;