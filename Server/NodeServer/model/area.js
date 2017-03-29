var mongoose = require('mongoose');

//User Schema
var areaSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _area : {
        type: String,
        required: true
    },
});


var Area = mongoose.model('Area', areaSchema);

module.exports = Area;