var mongoose = require('mongoose');

//User Schema
var usersTeamListSchema = mongoose.Schema({
    _user_id : {
        type: String,
        required: true
    },
    _team_id: {
        type: String,
        required: true
    },
});


var UsersTeamList = mongoose.model('UsersTeamList', usersTeamListSchema);

module.exports = UsersTeamList;