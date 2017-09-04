var mongoose = require('mongoose');

//User Schema
var productGroupSchema = mongoose.Schema({
    _id_product_group : {
        type: String,
        required: true
    },
    _name : {
        type: String,
    },
    _note : {
        type: String,
    },
    _is_enabled : {
        type: Boolean,
    }
});


var ProductGroup = mongoose.model('ProductGroup', productGroupSchema);

module.exports = ProductGroup;