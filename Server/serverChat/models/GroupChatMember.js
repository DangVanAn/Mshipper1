var mongoose = require('mongoose');

var groupChatSchema = mongoose.Schema({
    _group_id: {
        type: String,
        required: true
    },
    _user_id: {
        type: String,
        required: true
    },
    _is_enable: {
        type: Boolean,
        required: true
    }
});

var GroupChat = mongoose.model('GroupChatMember', groupChatSchema);

module.exports = GroupChat;