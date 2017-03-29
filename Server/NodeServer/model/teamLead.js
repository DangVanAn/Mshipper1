var mongoose = require('mongoose');

//User Schema
var teamLeadSchema = mongoose.Schema({
    _team_id: {
        type: String,
        required: true
    },
    _team_lead : {
        type: String,
        required: true
    },
    _manager : {
        type: String,
        required: true
    },
});


var TeamLead = mongoose.model('TeamLead', teamLeadSchema);

module.exports = TeamLead;