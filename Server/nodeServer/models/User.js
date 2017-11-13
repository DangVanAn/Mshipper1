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
    _id_delivery_manager : {
        type : String,
    },
    _name_delivery_manager : {
        type : String,
    },
    _driverLicenseNumber : {
        type: String,
    },
    _driverLicenseName : {
        type: String,
    },
    _id_customer : {
        type: String,
    },
    _id_delivery : {
        type: String,
    },
    _deliveryAddress : {
        type: String,
    },
    _latitude : {
        type: String,
    },
    _longitude: {
        type: String,
    },
    _radius: {
        type: Number,
    },
    _polygon: {
        type: String,
    },
    _id_warehouse: {
        type: String,
    },
    _device_token: {// token để firebase biết thiết bị nào để gửi notify
        type: String,
    },
});

var User = mongoose.model('User', userSchema);

module.exports = User;