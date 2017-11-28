var mongoose = require('mongoose');

//Schema
var PreOrdersAssignListSchema = mongoose.Schema({
    _id_file : {
        type : String,
    },
    _code_file : {
        type : String,
    },
    _number  : {
        type: Number,
    },
    _ton : {
        type : Number,
    },
    _is_enabled : {
        type: Boolean,
    },
    _note : {
        type: String,
    }
});

var PreOrdersAssignList = mongoose.model('PreOrdersAssignList', PreOrdersAssignListSchema);

module.exports = PreOrdersAssignList;