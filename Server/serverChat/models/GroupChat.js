var mongoose = require('mongoose');

var groupChatSchema = mongoose.Schema({
    _group_name: {
        type: String,
        required: true
    },
});

var GroupChat = mongoose.model('GroupChat', groupChatSchema);

module.exports = GroupChat;