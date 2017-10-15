var express = require('express');
var router = express.Router();
var GroupChat = require('../models/GroupChat');


var listGroupChat = [];
resetListGroupChat();
function resetListGroupChat() {
    GroupChat.find({_is_enable : true}, function (err, datas) {
        if (err)
            return console.error(err);
        else {
            listGroupChat = [];
            listGroupChat = datas;
            console.log('Find all success!!!');
        }
    });
}

router.get('/getall', function (req, res) {

// get all
    GroupChat.find({}, function (err, chats) {
        if (err) {
            res.status(200).send(repHttp(false, err));
            return console.error(err);
        }
        else {
            res.status(200).send(chats);
            console.log('Find all success!!!');
        }
    });
});

function addGroupChat(data) {
    var newGroupChat = new GroupChat(data);
    newGroupChat.save(function (err) {
        if (err)
            return console.error(err);
        else {
            console.log('groupchat created!');
            resetListGroupChat();
            return true;
        }
    });
}

router.createGroupChat = function (data) {
    return addGroupChat(data);
};

router.getListGroupChat = function () {
    return listGroupChat;
};

module.exports = router;
