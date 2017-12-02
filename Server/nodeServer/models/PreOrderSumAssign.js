var mongoose = require('mongoose');

//Schema
var PreOrderSumAssignSchema = mongoose.Schema({
    _pre_sum_time : {
        type: String,
    },
    _name_drivers : {
        type: String,
    },
    _id_drivers : {
        type: String,
    },
    _pre_sum_assign_time : {
        type: String,
    },
    _number_plate : {
        type: String,
    },
    _ton_for_vehicle : {
        type: Number,
    },
    _ton_real : {
        type : Number,
    },
    _trip : {
        type : String,
    },
    _weigh_for_vehicle : {
        type: Number,
    },
    _note_trip : {
        type: String,
    },
    _driver_accept :{
        type : Number,
        default : 0
    },
    _driver_cancel :{
        type : Number,
        default : 0
    },
    _time_create : {
        type: Number,
        default : 0
    },
    _note_cancel : {
        type: String,
    },
    _time_cancel : {
        type: Number,
        default : 0
    },
    _start_pickup :{
        type : Number,
        default : 0
    },
    _in_warehouse_auto :{
        type : Number,
        default : 0
    },
    _in_warehouse_guard :{
        type : Number,
        default : 0
    },
    _in_warehouse_driver :{
        type : Number,
        default : 0
    },
    _in_line_driver :{
        type : Number,
        default : 0
    },
    _in_line_manager_warehouse :{
        type : Number,
        default : 0
    },
    _out_line_driver :{
        type : Number,
        default : 0
    },
    _out_line_manager_warehouse :{
        type : Number,
        default : 0
    },
    _out_warehouse_auto :{
        type : Number,
        default : 0
    },
    _out_warehouse_guard :{
        type : Number,
        default : 0
    },
    _out_warehouse_driver :{
        type : Number,
        default : 0
    },
    _in_delivery_auto :{
        type : Number,
        default : 0
    },
    _in_delivery_customer :{
        type : Number,
        default : 0
    },
    _in_delivery_driver :{
        type : Number,
        default : 0
    },
    _time_done :{
        type : Number,
        default : 0
    },
    _is_enabled : {
        type: Boolean,
    }
});


var PreOrderSumAssign = mongoose.model('PreOrderSumAssign', PreOrderSumAssignSchema);

module.exports = PreOrderSumAssign;