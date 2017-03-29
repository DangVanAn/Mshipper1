var mongoose = require('mongoose');

//User Schema
var teamListSchema = mongoose.Schema({
    _team_id: {
        type: String,
        required: true
    },
    _name : {
        type: String,
        required: true
    },
    _area : {
        type: String,
        required: true
    },
    _status  : {
        type: String,
        required: true
    },
    _description  : {
        type: String,
        required: true
    },
});


var TeamList = mongoose.model('TeamList', teamListSchema);

module.exports = TeamList;