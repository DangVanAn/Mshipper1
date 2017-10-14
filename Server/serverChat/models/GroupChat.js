var mongoose = require('mongoose');

var groupChatSchema = mongoose.Schema({
    _group_id:{
        type: String,
        requireed: true
    },
    _group_name: {
        type: String,
        required: true
    },
    _is_enable: {
        type: Boolean,
        required: true
    },
});

var GroupChat = mongoose.model('GroupChat', groupChatSchema);

module.exports = GroupChat;