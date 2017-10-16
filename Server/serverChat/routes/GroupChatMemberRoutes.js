var express = require('express');
var router = express.Router();
const uuidv1 = require('uuid/v1');
var Chats = require('../models/Chat');
var GroupChatMember = require('../models/GroupChatMember');
var groupchats = require('../routes/GroupChatRoutes');

var listGroupChatMember = [];
resetListGroupChatMember();
function resetListGroupChatMember() {
    GroupChatMember.find({_is_enable : true}, function (err, datas) {
        if (err)
            return console.error(err);
        else {
            listGroupChatMember = [];
            listGroupChatMember = datas;
            console.log('Find all success!!!');
        }
    });
}

router.get('/getall', function (req, res) {

// get all
    Chats.find({}, function (err, chats) {
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

router.post('/getgroupchatbyid', function (req, res) {
    var listGroupChat = [];
    var tempListGroupChat = [];
    var listGroupChatDetail = groupchats.getListGroupChat();

    console.log(req.body);

    for(var i = 0; i < listGroupChatMember.length; i++){
        if(listGroupChatMember[i]._user_id == req.body._id && listGroupChat.indexOf(listGroupChatMember[i]._group_id) === -1){
            listGroupChat.push(listGroupChatMember[i]._group_id);
        }
    }

    console.log(listGroupChatDetail);

    for(var i = 0; i < listGroupChatDetail.length; i++){
        if(listGroupChat.indexOf(listGroupChatDetail[i]._group_id) !== -1){
            tempListGroupChat.push(listGroupChatDetail[i]);
        }
    }

    res.status(200).send({success: true, message: "OK", data: JSON.stringify(tempListGroupChat)});
});

router.post('/getgroupchat2member', function (req, res) {
    console.log(req.body)
    // req.body = [{_user_id : '59b78c7e7a14a4122c8b720b',_user_name : '11'},{_user_id : '59b793367a14a4122c8b7217',_user_name : '24'}]
    var group_id = findGroupChat2Member(req.body[0]._id, req.body[1]._id);
    if(group_id == 'false')
    {
        //Nếu chưa có thì tạo một group chat mới.
        group_id = uuidv1();
        var data = {_group_id : group_id, _group_name : req.body[0]._name + ', ' + req.body[1]._name, _is_enable : true};
        groupchats.createGroupChat(data);

        for(var i = 0; i < req.body.length; i++){
            var dataTemp = {_group_id : group_id, _user_id : req.body[i]._id, _is_enable : true};
            var newGroupChatMember = new GroupChatMember(dataTemp);
            listGroupChatMember.push(dataTemp);
            newGroupChatMember.save(function (err) {
                if (err)
                    return console.error(err);
                else {
                    resetListGroupChatMember();
                    console.log('groupchatmember created!');

                }
            });
        }

        res.status(200).send({success: true, message: "OK", data: group_id});
    }
    else {
        res.status(200).send({success: true, message: "OK", data: group_id});
    }
});

router.post('/addmembertogroup', function (req, res) {

    var boolExist = false;
    for(var i = 0; i < listGroupChatMember.length; i++)
    {
        if(listGroupChatMember[i]._group_id == req.body._group_id && listGroupChatMember[i]._user_id == req.body._user_id)
        {
            boolExist = true;
            break;
        }
    }
    if(!boolExist){
        req.body._is_enable = true;
        var newGroupChatMember = new GroupChatMember(req.body);
        newGroupChatMember.save(function (err) {
            if (err)
                return console.error(err);
            else {
                console.log('groupchatmember created!');
                res.status(200).send({success: true, message: "OK", data: req.body._group_id});
            }
        });
    }
    else {
        res.status(200).send({success: true, message: "OK", data: req.body._group_id});
    }
});

function findGroupChat2Member(member1, member2) {
    for(var i = 0; i < listGroupChatMember.length; i++)
    {
        if(listGroupChatMember[i]._user_id == member1)
        {
            for(var j = 0; j < listGroupChatMember.length; j++)
            {
                if(listGroupChatMember[j]._user_id == member2 && listGroupChatMember[j]._group_id == listGroupChatMember[i]._group_id){
                    var coutnMember = 0;
                    var tempGroupId = listGroupChatMember[j]._group_id;
                    for(var ii = 0; ii < listGroupChatMember.length; ii++)
                    {
                        if(listGroupChatMember[ii]._group_id == listGroupChatMember[j]._group_id)
                        {
                            coutnMember++;
                        }
                    }
                    if(coutnMember === 2)
                    {
                        return tempGroupId;
                    }
                }
            }
        }
    }
    return 'false';
}

module.exports = router;
