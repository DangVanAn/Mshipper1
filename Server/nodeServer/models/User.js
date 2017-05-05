var mongoose = require('mongoose');

//User Schema
var userSchema = mongoose.Schema({

    _identify_card: {
        type: String,
    },
    _first_name: {
        type: String,
    },
    _last_name: {
        type: String,
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
    },
    _is_enabled : {
        type: String,
    }
});


var User = mongoose.model('User', userSchema);

module.exports = User;