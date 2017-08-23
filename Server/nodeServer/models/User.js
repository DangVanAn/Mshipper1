var mongoose = require('mongoose');

//User Schema
var userSchema = mongoose.Schema({

    _identify_card: {
        type: String,
    },
    _name: {
        type: String,
    },
    _email: {
        type: String,
    },
    _hashed_password: {
        type: String,
    },
    _token:{
        type: String,
    },
    _assign_code: {
        type: String,
    },
    _pass_code: {
        type: String,
    },
    _date_of_birth: {
        type: String,
    },
    _address: {
        type: String,
    },
    _image_url: {
        type: String,
    },
    _phone: {
        type: String,
    },
    _gender: {
        type: String,
    },
    _permission_id: {
        type: String,
    },
    _is_enabled : {
        type: Boolean,
    },
    _company : {
        type: String,
    },
    _image : {
        type: String,
    },
    _vehicleLicense : {
        type: String,
    },
    _deliveryAddress : {
        type: String,
    }
});


var User = mongoose.model('User', userSchema);

module.exports = User;