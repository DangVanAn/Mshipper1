var mongoose = require('mongoose');

//User Schema
var package_typeSchema = mongoose.Schema({
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
        required: true
    },
});


var Package_type = mongoose.model('Package_type',package_typeSchema);

module.exports = Package_type;