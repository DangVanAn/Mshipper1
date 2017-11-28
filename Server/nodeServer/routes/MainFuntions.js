var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Warehouse = require('../models/Warehouse');
var Vehicle = require('../models/Vehicle');
var PreOrder = require('../models/PreOrders');
var PreOrderAssign = require('../models/PreOrdersAssign');
var PreOrderSum = require('../models/PreOrderSum');
var PreOrderSumAssign = require('../models/PreOrderSumAssign');
var AssignDriver = require('../models/AssignDriver');
var HashMap = require('hashmap');
var hashmap = new HashMap();

//var public/////////////////////////////////////////////////////////////////////////////////////////////////////////
var boolResetUser = false;
var boolResetWarehouse = false;
var boolResetPreOrderSum = false;

//.User /////////////////////////////////////////////////////////////////////////////////////////////////////////////
var listUser = [];
resetListUser();

function resetListUser() {
    listUser = [];
    User.find({_is_enabled: true}, function (err, users) {
        if (err)
            return console.error(err);
        else {
            listUser = users;
            boolResetUser = true;
            resetListPreOrderSum_MoreInfo();
            console.log('Find all success!!!');
        }
    }).select('-_token -_hashed_password');
}

router.user_ResetList = function () {
    resetListUser();
};

router.user_GetAllUser = function () {
    return listUser;
};

router.user_SetIsEnable = function (phone, value) {
    for (var i = 0; i < listUser.length; i++) {
        if (listUser[i]._phone === phone) {
            listUser[i]._is_enabled = value;
            break;
        }
    }

    resetListPreOrderSum_MoreInfo();
};

router.user_UpdateById = function (identify_card, body) {
    for (var i = 0; i < listUser.length; i++) {
        if (listUser[i]._identify_card === identify_card) {
            listUser[i] = body;
            break;
        }
    }

    resetListPreOrderSum_MoreInfo();
};

router.user_UpdateByPhone = function (phone, body) {
    for (var i = 0; i < listUser.length; i++) {
        if (listUser[i]._phone === phone) {
            listUser[i] = body;
            break;
        }
    }

    resetListPreOrderSum_MoreInfo();
};

router.user_GetByPermisstion = function (permission_id) {
    var listData = [];

    for (var i = 0; i < listUser.length; i++) {
        if (listUser[i]._permission_id === permission_id) {
            listData.push(listUser[i]);
        }
    }

    return listData;
};

router.user_FindByPhone = function (phone) {
    var listData = [];
    for (var i = 0; i < listUser.length; i++) {
        var re = new RegExp(phone, 'g');
        if (listUser[i]._phone.match(re)) {
            listData.push(listUser[i]);
        }
    }

    return listData;
};

router.user_GetByPermissionAndIdManager = function (permission, idDeliveryManager) {
    var listData = [];
    for (var i = 0; i < listUser.length; i++) {
        if (listUser[i]._permission_id === permission && listUser[i]._id_delivery_manager === idDeliveryManager) {
            listData.push(listUser[i]);
        }
    }

    return listData;
};

router.user_Add = function (body) {
    listUser.push(body);

    resetListPreOrderSum_MoreInfo();
};

router.user_Adds = function (bodys) {
    for (var i = 0; i < bodys.length; i++) {
        listUser.push(bodys[i]);
    }

    resetListPreOrderSum_MoreInfo();
};

//.Warehouse ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var listWarehouses = [];
resetListWarehouse();

function resetListWarehouse() {
    Warehouse.find({_is_enabled: true}, function (err, warehouses) {
        if (err)
            return console.error(err);
        else {
            listWarehouses = warehouses;
            boolResetWarehouse = true;
            resetListPreOrderSum_MoreInfo();
            console.log('Find all success!!!');
        }
    });
};

router.warehouse_GetAll = function () {
    return listWarehouses;
};

router.warehouse_Add = function (body) {
    listWarehouses.push(body);

    resetListPreOrderSum_MoreInfo();
};

router.warehouse_Adds = function (bodys) {
    for (var i = 0; i < bodys; i++) {
        listWarehouses.push(bodys[i]);
    }

    resetListPreOrderSum_MoreInfo();
};

router.warehouse_SetIsEnable = function (id_warehouse, value) {
    for (var i = 0; i < listWarehouses.length; i++) {
        if (listWarehouses[i]._id_warehouse === id_warehouse) {
            listWarehouses[i]._is_enabled = value;
            break;
        }
    }

    resetListPreOrderSum_MoreInfo();
};

router.warehouse_FindByIdWarehouse = function (id_warehouse) {
    for (var i = 0; i < listWarehouses.length; i++) {
        if (listWarehouses[i]._id_warehouse === id_warehouse) {
            return listWarehouses[i];
        }
    }

    return [];
};

router.warehouse_Update = function (id_warehouse, body) {
    for (var i = 0; i < listWarehouses.length; i++) {
        if (listWarehouses[i]._id_warehouse === id_warehouse) {
            listWarehouses[i] = body;
            break;
        }
    }

    resetListPreOrderSum_MoreInfo();
};

//.Vehicle////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var listVehicles = [];

resetListVehicle();

function resetListVehicle() {
    Vehicle.find({_is_enabled: true}, function (err, vehicles) {
        if (err)
            return console.error(err);
        else {
            listVehicles = vehicles;
            console.log('Find all success!!!');
        }
    });
}

router.vehicle_GetAll = function () {
    return listVehicles;
};

router.vehicle_GetByOwner = function (owner) {
    var data = [];
    for (var i = 0; i < listVehicles.length; i++) {
        if (listVehicles[i]._owner === owner && listVehicles[i]._is_enabled === true) {
            data.push(listVehicles[i]);
        }
    }

    return data;
};

router.vehicle_Add = function (body) {
    listVehicles.push(body);
};

router.vehicle_Adds = function (bodys) {
    for (var i = 0; i < bodys.length; i++) {
        listVehicles.push(bodys[i]);
    }
};

router.vehicle_ResetList = function () {
    resetListVehicle();
};

router.vehicle_FindById = function (id) {
    for (var i = 0; i < listVehicles.length; i++) {
        if (listVehicles[i]._id === id) {
            return listVehicles[i];
        }
    }
    return [];
};

//.PreOrder////////////////////////////////////////////////////////////////////////////////////////////////////////////
var listPreOrders = [];
resetListPreOrder();

function resetListPreOrder() {
    PreOrder.find({}, function (err, preorders) {
        if (err)
            return console.error(err);
        else {
            listPreOrders = preorders;
            for (var i = 0; i < preorders.length; i++) {
                hashmap.set(preorders[i]._id_order, preorders[i]);
            }
            console.log('LitsPreorders', preorders.length);
        }
    });
}

router.preOrder_GetAll = function () {
    return listPreOrders;
};

router.preOrder_GetByCodeFile = function (code_file) {
    var data = [];
    for (var i = 0; i < listPreOrders.length; i++) {
        if (listPreOrders[i]._code_file === code_file) {
            data.push(listPreOrders[i]);
        }
    }

    return data;
};

//.PreOrderAssign/////////////////////////////////////////////////////////////////////////////////////////////////////
var listPreOrdersAssign = [];
resetLitsPreOrderAssign();

function resetLitsPreOrderAssign() {
    PreOrderAssign.find({}, function (err, preordersassign) {
        if (err)
            return console.error(err);
        else {
            listPreOrdersAssign = [];
            for (var i = 0; i < preordersassign.length; i++) {
                hashmap.set(preordersassign[i]._id_order + "assign", preordersassign[i]);
                listPreOrdersAssign.push(preordersassign[i]);
            }
            console.log('LitsPreordersAssign', preordersassign.length);
        }
    });
}

router.preOrderAssign_GetAll = function () {
    return listPreOrdersAssign;
};

//.PreOrderSum////////////////////////////////////////////////////////////////////////////////////////////////////////

var listPreOrderSum = [];

resetListPreOrderSum();

function resetListPreOrderSum() {
    PreOrderSum.find({}, function (err, preordersum) {
        if (err)
            return console.error(err);
        else {
            listPreOrderSum = JSON.parse(JSON.stringify(preordersum));
            boolResetPreOrderSum = true;
            resetListPreOrderSum_MoreInfo();
        }
    });
}

function resetListPreOrderSum_MoreInfo() {
    if (boolResetUser && boolResetWarehouse && boolResetPreOrderSum) {
        for (var i = 0; i < listPreOrderSum.length; i++) {
            for (var j = 0; j < listWarehouses.length; j++) {
                if (listPreOrderSum[i]._id_warehouse == listWarehouses[j]._id_warehouse) {
                    listPreOrderSum[i]['_position_warehouse'] = listWarehouses[j]._latitude + "," + listWarehouses[j]._longitude;
                    listPreOrderSum[i]['_polygon_warehouse'] = listWarehouses[j]._polygon;
                    break;
                }
            }

            for (var j = 0; j < listUser.length; j++) {
                if (listPreOrderSum[i]._id_delivery == listUser[j]._id_delivery) {
                    listPreOrderSum[i]['_position_delivery'] = listUser[j]._latitude + "," + listUser[j]._longitude;
                    listPreOrderSum[i]['_polygon_delivery'] = listUser[j]._polygon;
                    break;
                }
            }
        }
    }
}

router.preOrderSum_GetAll = function () {
    return listPreOrderSum;
};

router.preOrderSum_GetRefuse = function () {
    var data = [];
    for (var i = 0; i < listPreOrderSum.length; i++) {
        if (listPreOrderSum[i]._time_refuse != 0 && listPreOrderSum[i]._is_enabled == true) {
            data.push(listPreOrderSum[i]);
        }
    }

    return data;
};

router.preOrderSum_Add = function (body) {
    listPreOrderSum.push(body);
    resetListPreOrderSum_MoreInfo();
    resetListPreOrderSumAssign_MoreInfo();
};

router.preOrderSum_Adds = function (bodys) {
    for (var i = 0; i < bodys.length; i++) {
        listPreOrderSum.push(bodys[i]);
    }
    resetListPreOrderSum_MoreInfo();
    resetListPreOrderSumAssign_MoreInfo();
};

router.preOrderSum_SetIsEnable = function (pre_sum_time, value) {
    for (var i = 0; i < listPreOrderSum.length; i++) {
        if (listPreOrderSum[i]._pre_sum_time === pre_sum_time) {
            listPreOrderSum[i]._is_enabled = value;
            break;
        }
    }
    resetListPreOrderSumAssign_MoreInfo();
};

router.preOrderSum_GetByIdPreSum = function (listId) {
    var data = [];
    for (var i = 0; i < listId.length; i++) {
        for (var j = 0; j < listPreOrderSum.length; j++) {
            if (listPreOrderSum[j]._id === listId[i]._id) {
                data.push(listPreOrderSum[j]);
            }
        }
    }

    return data;
};

router.preOrderSum_GetByIdPreSumBefore = function (listId) {
    var data = [];
    for (var i = 0; i < listId.length; i++) {
        for (var j = 0; j < listPreOrderSum.length; j++) {
            if (listPreOrderSum[j]._id_pre_order_sum_before === listId[i]._id && listPreOrderSum[j]._is_enabled === true) {
                data.push(listPreOrderSum[j]);
            }
        }
    }

    return data;
};

router.preOrderSum_Update = function (preordersum) {
    for (var i = 0; i < listPreOrderSum.length; i++) {
        if (listPreOrderSum[i]._pre_sum_time === preordersum._pre_sum_time) {
            listPreOrderSum[i] = preordersum;
            resetListPreOrderSum_MoreInfo();
            break;
        }
    }
    resetListPreOrderSumAssign_MoreInfo();
};

router.preOrderSum_GetByCodeFile = function (code_file) {
    var data = [];
    for (var i = 0; i < listPreOrderSum.length; i++) {
        if (listPreOrderSum[i]._code_file === code_file) {
            data.push(listPreOrderSum[i]);
        }
    }
    return data;
};

//.PreOrderSumAssign///////////////////////////////////////////////////////////////////////////////////////////////////
var listPreOrderSumAssign = [];
resetListPreOrderSumAssign();

function resetListPreOrderSumAssign() {
    PreOrderSumAssign.find({}, function (err, preordersumassign) {
        if (err)
            return console.error(err);
        else {
            listPreOrderSumAssign = JSON.parse(JSON.stringify(preordersumassign));
            resetListPreOrderSumAssign_MoreInfo();
            console.log('Find all success!!!');
        }
    });
}

function resetListPreOrderSumAssign_MoreInfo() {
    for (var i = 0; i < listPreOrderSumAssign.length; i++) {
        for (var j = 0; j < listPreOrderSum.length; j++) {
            if (listPreOrderSumAssign[i]._pre_sum_time === listPreOrderSum[j]._pre_sum_time && listPreOrderSum[i]._is_enabled === true) {
                listPreOrderSumAssign[i]._id_warehouse = listPreOrderSum[j]._id_warehouse;
                listPreOrderSumAssign[i]._id_delivery = listPreOrderSum[j]._id_delivery;
                listPreOrderSumAssign[i]._etd = listPreOrderSum[j]._etd;
                listPreOrderSumAssign[i]._eta = listPreOrderSum[j]._eta;
                listPreOrderSumAssign[i]._type_product = listPreOrderSum[j]._type_product;
            }
        }
    }
}

router.preOrderSumAssign_GetAll = function () {
    return listPreOrderSumAssign;
};

router.preOrderSumAssign_GetByIdPreSumAssign = function (bodys) {
    var data = [];
    for (var i = 0; i < bodys.length; i++) {
        for (var j = 0; j < listPreOrderSumAssign.length; j++) {
            if (listPreOrderSumAssign[j]._id === bodys[i]._id) {
                data.push(listPreOrderSumAssign[j]);
            }
        }
    }

    return data;
};

router.preOrderSumAssign_GetByPreSumTime = function (bodys) {
    var data = [];
    for (var i = 0; i < bodys.length; i++) {
        for (var j = 0; j < listPreOrderSumAssign.length; j++) {
            if (listPreOrderSumAssign[j]._pre_sum_time === bodys[i]._pre_sum_time) {
                data.push(listPreOrderSumAssign[j]);
            }
        }
    }

    return data;
};

router.preOrderSumAssign_Add = function (body) {
    listPreOrderSumAssign.push(body);
};

router.preOrderSumAssign_Update = function (body) {
    for (var i = 0; i < listPreOrderSumAssign.length; i++) {
        if (listPreOrderSumAssign[i]._pre_sum_assign_time === body._pre_sum_assign_time) {
            listPreOrderSumAssign[i] = body;
        }
    }
};

router.preOrderSumAssign_GetByElementZero = function (elementTrue, elementFalse, id_warehouse) {
    var listData = [];
    for (var i = 0; i < listPreOrderSumAssign.length; i++) {
        //hiện tại đang set mặc định là chưa có vào trạng thái đó.
        if (listPreOrderSumAssign[i][elementTrue] !== 0 && listPreOrderSumAssign[i][elementFalse] === 0 && listPreOrderSumAssign[i]._id_warehouse === id_warehouse) {
            listData.push(listPreOrderSumAssign[i]);
        }
    }

    //trong listData kiểm tra xem thằng nào có cùng số trip sẽ gộp lại thành 1 line;
    var listData_Sub = [];
    var listTrip = [];
    for (var i = 0; i < listData.length; i++) {
        if (listTrip.indexOf(listData[i]._trip) === -1) {
            listTrip.push(listData[i]._trip);
            listData_Sub.push({_trip: listData[i]._trip, data: [listData[i]], order: []});
        }
        else {
            for (var j = 0; j < listData_Sub.length; j++) {
                if (listData_Sub[j]._trip === listData[i]._trip) {
                    listData_Sub[j].data.push(listData[i]);
                    break;
                }
            }
        }
    }

    // var listOrder =  getPreOrderAssignByTrip(listTrip);
    //
    // console.log('269', listOrder.length);
    //
    // for(var i = 0; i < listData_Sub.length; i++)
    // {
    //     //đang làm gán thêm thông tin order cho khách hàng
    // }

    return listData_Sub;
};

router.preOrderSumAssign_FindByPreSumTime = function (pre_sum_time) {
    var listData = [];
    for (var i = 0; i < listPreOrderSumAssign.length; i++) {
        if (listPreOrderSumAssign[i]._pre_sum_time === pre_sum_time) {
            listData.push(listPreOrderSumAssign[i]);
        }
    }

    return listData;
};

//.AssignDriver////////////////////////////////////////////////////////////////////////////////////////////////////////

var listAssignDriver = [];
resetListPreOrderSumAssignDriver();

function resetListPreOrderSumAssignDriver() {
    listAssignDriver = [];
    AssignDriver.find({}, function (err, assigndriver) {
        if (err)
            return console.error(err);
        else {
            listAssignDriver = assigndriver;
            console.log('Find all success!!!');
        }
    });
}

router.assignDriver_GetAll = function () {
    return listAssignDriver;
};

router.assignDriver_GetByDriver = function (driver) {
    var listData = [];
    for (var i = 0; i < listAssignDriver.length; i++) {
        if (listAssignDriver[i]._driver === driver) {
            listData.push(listAssignDriver[i]);
        }
    }
};

router.assignDriver_GetByPreSumAssignTime = function (pre_sum_assign_time) {
    var listData = [];
    for (var i = 0; i < listAssignDriver.length; i++) {
        if (listAssignDriver[i]._pre_sum_assign_time === pre_sum_assign_time) {
            listData.push(listAssignDriver[i]);
        }
    }
};

router.assignDriver_Add = function (body) {
    listAssignDriver.push(body);
};

router.assignDriver_Cancel = function (pre_sum_assign_time, value, time, note) {
    for (var i = 0; i < listAssignDriver.length; i++) {
        if (listAssignDriver[i]._pre_sum_assign_time === pre_sum_assign_time) {
            listAssignDriver[i]._is_enabled = value;
            listAssignDriver[i]._time_cancel = time;
            listAssignDriver[i]._note_cancel = note;
        }
    }
};

router.assignDriver_Adds = function (bodys) {
    for (var i = 0; i < bodys.length; i++) {
        listAssignDriver.push(bodys[i]);
    }
};

router.assignDriver_SetIsEnable = function (pre_sum_assign_time, value) {
    for (var i = 0; i < listAssignDriver.length; i++) {
        if (listAssignDriver[i]._pre_sum_assign_time === pre_sum_assign_time) {
            listAssignDriver[i]._is_enabled = value;
        }
    }
};

router.assignDriver_GetAllInfo = function (id_driver) {
    var listData = [];

    for (var i = 0; i < listAssignDriver.length; i++) {
        if (listAssignDriver[i]._driver === id_driver && listAssignDriver[i]._is_enabled === true && listAssignDriver[i]._lead_driver === true) {
            listData.push(JSON.parse(JSON.stringify(listAssignDriver[i])));
        }
    }

    for (var i = 0; i < listData.length; i++) {
        listData[i]._other_driver = [];
        for (var j = 0; j < listAssignDriver.length; j++) {
            if (listAssignDriver[j]._pre_sum_assign_time === listData[i]._pre_sum_assign_time && listData[i]._id !== listAssignDriver[j]._id && listAssignDriver[j]._lead_driver === false) {
                listData[i]._other_driver.push(JSON.parse(JSON.stringify(listAssignDriver[j])));
            }
        }
    }

    for (var i = 0; i < listData.length; i++) {
        listData[i]._pre_order_sum_assign = [];
        for (var j = 0; j < listPreOrderSumAssign.length; j++) {
            if (listPreOrderSumAssign[j]._pre_sum_assign_time === listData[i]._pre_sum_assign_time && listPreOrderSumAssign[j]._driver_accept !== 0) {
                listData[i]._pre_order_sum_assign.push(JSON.parse(JSON.stringify(listPreOrderSumAssign[j])));
            }
        }
    }

    for (var i = 0; i < listData.length; i++) {
        if (listData[i]._pre_order_sum_assign.length === 0) {
            listData.splice(i, 1);
            i--;
        }
    }

    for (var i = 0; i < listData.length; i++) {
        for (var ii = 0; ii < listData[i]._pre_order_sum_assign.length; ii++) {
            listData[i]._pre_order_sum_assign[ii]._pre_order_sum = [];
            for (var j = 0; j < listPreOrderSum.length; j++) {
                if (listPreOrderSum[j]._pre_sum_time === listData[i]._pre_order_sum_assign[ii]._pre_sum_time) {
                    listData[i]._pre_order_sum_assign[ii]._pre_order_sum.push(JSON.parse(JSON.stringify(listPreOrderSum[j])));
                }
            }
        }
    }

    //tạo data theo số trip
    var listTrip = [];
    var listIdTrip = [];
    for (var i = 0; i < listData.length; i++) {
        if (listData[i]._pre_order_sum_assign[0]._trip !== undefined && listIdTrip.indexOf(listData[i]._pre_order_sum_assign[0]._trip) === -1) {
            listIdTrip.push(listData[i]._pre_order_sum_assign[0]._trip);
            listTrip.push({_trip: listData[i]._pre_order_sum_assign[0]._trip, data: []});
            for (var j = 0; j < listData.length; j++) {
                if (listData[j]._pre_order_sum_assign[0]._trip === listData[i]._pre_order_sum_assign[0]._trip) {
                    listTrip[listTrip.length - 1].data.push(listData[j]);
                }
            }
        }
    }

    return listTrip;
};

router.assignDriver_GetTrip = function (id_driver) {
    var listData = [];

    for (var i = 0; i < listAssignDriver.length; i++) {
        if (listAssignDriver[i]._driver === id_driver && listAssignDriver[i]._is_enabled === true && listAssignDriver[i]._lead_driver === true) {
            listData.push(JSON.parse(JSON.stringify(listAssignDriver[i])));
        }
    }

    for (var i = 0; i < listData.length; i++) {
        listData[i]._other_driver = [];
        for (var j = 0; j < listAssignDriver.length; j++) {
            if (listAssignDriver[j]._pre_sum_assign_time === listData[i]._pre_sum_assign_time && listData[i]._id !== listAssignDriver[j]._id && listAssignDriver[j]._lead_driver === false) {
                listData[i]._other_driver.push(JSON.parse(JSON.stringify(listAssignDriver[j])));
            }
        }
    }

    for (var i = 0; i < listData.length; i++) {
        listData[i]._pre_order_sum_assign = [];
        for (var j = 0; j < listPreOrderSumAssign.length; j++) {
            if (listPreOrderSumAssign[j]._pre_sum_assign_time === listData[i]._pre_sum_assign_time && listPreOrderSumAssign[j]._driver_accept === 0) {
                listData[i]._pre_order_sum_assign.push(JSON.parse(JSON.stringify(listPreOrderSumAssign[j])));
            }
        }
    }

    for (var i = 0; i < listData.length; i++) {
        if (listData[i]._pre_order_sum_assign.length === 0) {
            listData.splice(i, 1);
            i--;
        }
    }

    for (var i = 0; i < listData.length; i++) {
        for (var ii = 0; ii < listData[i]._pre_order_sum_assign.length; ii++) {
            listData[i]._pre_order_sum_assign[ii]._pre_order_sum = [];
            for (var j = 0; j < listPreOrderSum.length; j++) {
                if (listPreOrderSum[j]._pre_sum_time === listData[i]._pre_order_sum_assign[ii]._pre_sum_time) {
                    listData[i]._pre_order_sum_assign[ii]._pre_order_sum.push(JSON.parse(JSON.stringify(listPreOrderSum[j])));
                }
            }
        }
    }

    //tạo data theo số trip
    var listTrip = [];
    var listIdTrip = [];
    for (var i = 0; i < listData.length; i++) {
        if (listData[i]._pre_order_sum_assign[0]._trip !== undefined && listIdTrip.indexOf(listData[i]._pre_order_sum_assign[0]._trip) === -1) {
            listIdTrip.push(listData[i]._pre_order_sum_assign[0]._trip);
            listTrip.push({_trip: listData[i]._pre_order_sum_assign[0]._trip, data: []});
            for (var j = 0; j < listData.length; j++) {
                if (listData[j]._pre_order_sum_assign[0]._trip === listData[i]._pre_order_sum_assign[0]._trip) {
                    listTrip[listTrip.length - 1].data.push(listData[j]);
                }
            }
        }
    }

    return listTrip;
};

module.exports = router;