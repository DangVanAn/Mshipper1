var mongoose = require('mongoose');

//User Schema
var productSchema = mongoose.Schema({
    _id_product : {
        type: String,
        required: true
    },
    _id_product_group : {
        type: String,
        required: true
    },
    _name : {
        type: String,
    },
    _unit : {
        type: String,
    },
    _weigh : {
        type: Number,
    },
    _volume : {
        type: Number,
    },
    _note : {
        type: String,
    },
    _is_enabled : {
        type: Boolean,
    }
});


var Product = mongoose.model('Product', productSchema);

module.exports = Product;