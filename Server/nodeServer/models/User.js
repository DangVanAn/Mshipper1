var mongoose = require('mongoose');

//User Schema
var userSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _identify_card: {
        type: String,
        required: true
    },
    _first_name: {
        type: String,
        required: true
    },
    _last_name: {
        type: String,
        required: true
    },
    _email: {
        type: String,
    },
    _hashed_password: {
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
    }
});


var User = mongoose.model('User', userSchema);

module.exports = User;