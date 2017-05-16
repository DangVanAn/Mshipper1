var mongoose = require('mongoose');

//User Schema
var areaSchema = mongoose.Schema({
    _area : {
        type: String,
        required: true
    },
    _city : {
        type: String,
        required: true
    },
    _district : {
        type: String,
        required: true
    },
    _description : {
        type: String,
    },

});


var Area = mongoose.model('Area', areaSchema);

module.exports = Area;