var mongoose = require('mongoose');

//User Schema
var permissionTypeListSchema = mongoose.Schema({
    _permission_type_id: {
        type: String,
        required: true
    },
    _name: {
        type: String,
        required: true
    },
});


var PermissionTypeList = mongoose.model('PermissionTypeList', permissionTypeListSchema);

module.exports = PermissionTypeList;