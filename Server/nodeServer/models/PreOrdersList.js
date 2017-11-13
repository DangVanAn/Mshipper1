var mongoose = require('mongoose');

//Schema
var PreOrdersListSchema = mongoose.Schema({
    //Mã của file
    _code_file : {
        type : String,
    },
    _number  : {
        type: Number,
    },
    _ton : {
        type : Number,
    },
    _create_time : {
        type : Number,
    },
    _create_user : {
        type : String,
    },
    _create_user_name : {
        type : String,
    },
    _status : {
        type : String,
    },
    _is_enabled : {
        type: Boolean,
    },
     _note : {  
        type: String,
    }
});


var PreOrdersList = mongoose.model('PreOrdersList', PreOrdersListSchema);

module.exports = PreOrdersList;