var mongoose = require('mongoose');

//User Schema
var permissionIdListSchema = mongoose.Schema({
    _permission_id: {
        type: String,
        required: true
    },
     _name: {
        type: String,
        required: true
    },
});


var PermissionIdList = mongoose.model('PermissionIdList', permissionIdListSchema);

module.exports = PermissionIdList;