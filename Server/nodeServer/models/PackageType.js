var mongoose = require('mongoose');

//User Schema
var packageTypeSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _name : {
        type: String,
        required: true
    },
    _description : {
        type: String,
    },
});


var PackageType = mongoose.model('Package_type',packageTypeSchema);

module.exports = PackageType;