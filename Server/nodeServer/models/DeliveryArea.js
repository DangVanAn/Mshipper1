var mongoose = require('mongoose');

//User Schema
var deliveryAreaSchema = mongoose.Schema({
    _phone_user : {
        type: String,
        required: true
    },
    _id_area : {
        type: String,
        required: true
    },
    _name_area : {
        type: String,
        required: true
    },
    _address : {
        type: String,
        required: true
    },
    _list_latLng : {
        type: String,
        required: true
    },
    _note : {
        type: String,
        required: true
    },

});


var DeliveryArea = mongoose.model('DeliveryArea', deliveryAreaSchema);

module.exports = DeliveryArea;