var mongoose = require('mongoose');

var chatSchema = mongoose.Schema({
    _message: {
        type: String,
        required: true
    },
    _sender: {
        type: String,
        required: true
    },
    _sender_name: {
        type: String,
    },
    _receiver: {
        type: String,
        required: true
    },
    _receiver_name: {
        type: String,
    },
    _timestamp_sender: {
        type: Number,
        required: true
    },
    _timestamp_receiver: {
        type: Number,
    },
    _timestamp_seen: {
        type: Number,
    },
    _group_id: {
        type: String
    },
    _is_enable:{
        type: Boolean,
    },
});

var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;