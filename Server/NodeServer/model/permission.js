var mongoose = require('mongoose');

//User Schema
var permissionSchema = mongoose.Schema({
    _permission_id: {
        type: String,
        required: true
    },
    _module_id: {
        type: String,
        required: true
    },
    _permission_type_id: {
        type: String,
        required: true
    },
});


var Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;