var mongoose = require('mongoose');

//User Schema
var NotificationsSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _alert: {
        type: String,
        required: true
    },
    _sender : {
        type: String,
        required: true
    },
    _timestamp : {
        type: Date,
        required: true
    },
    _seen: {
        type: Boolean,
        required: true
    },
    _confirmed : {
        type: Number,
        required: true
    },
});


var Notifications = mongoose.model('Notifications', NotificationsSchema);

module.exports = Notifications;