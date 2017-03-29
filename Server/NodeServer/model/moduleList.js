var mongoose = require('mongoose');

//User Schema
var moduleListSchema = mongoose.Schema({
    _module_id: {
        type: String,
        required: true
    },
     _name: {
        type: String,
        required: true
    },
});


var ModuleList = mongoose.model('ModuleList', moduleListSchema);

module.exports = ModuleList;