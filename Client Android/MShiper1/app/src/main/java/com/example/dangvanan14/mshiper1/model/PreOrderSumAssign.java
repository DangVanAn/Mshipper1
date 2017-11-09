package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.List;

public class PreOrderSumAssign implements Parcelable {
    private String _id;
    private String _pre_sum_time;
    private String _name_drivers;
    private String _id_drivers;
    private String _pre_sum_assign_time;
    private String _number_plate;
    private double _ton_for_vehicle;
    private double _weigh_for_vehicle;
    private String _note_trip;
    private long _time_create;
    private String _note_cancel;
    private long _time_cancel;
    private long _start_pickup;
    private long _in_warehouse_auto;
    private long _in_warehouse_guard;
    private long _in_warehouse_driver;
    private long _in_line_driver;
    private long _in_line_manager_warehouse;
    private long _out_line_driver;
    private long _out_line_manager_warehouse;
    private long _out_warehouse_auto;
    private long _out_warehouse_guard;
    private long _out_warehouse_driver;
    private long _in_delivery_auto;
    private long _in_delivery_customer;
    private long _in_delivery_driver;
    private long _time_done;
    private boolean _is_enabled;
    private double _ton_real;
    private String _trip;
    private long _driver_accept;
    private List<PreOrderSum> _pre_order_sum;

    protected PreOrderSumAssign(Parcel in) {
        _id = in.readString();
        _pre_sum_time = in.readString();
        _name_drivers = in.readString();
        _id_drivers = in.readString();
        _pre_sum_assign_time = in.readString();
        _number_plate = in.readString();
        _ton_for_vehicle = in.readDouble();
        _weigh_for_vehicle = in.readDouble();
        _note_trip = in.readString();
        _time_create = in.readLong();
        _note_cancel = in.readString();
        _time_cancel = in.readLong();
        _start_pickup = in.readLong();
        _in_warehouse_auto = in.readLong();
        _in_warehouse_guard = in.readLong();
        _in_warehouse_driver = in.readLong();
        _in_line_driver = in.readLong();
        _in_line_manager_warehouse = in.readLong();
        _out_line_driver = in.readLong();
        _out_line_manager_warehouse = in.readLong();
        _out_warehouse_auto = in.readLong();
        _out_warehouse_guard = in.readLong();
        _out_warehouse_driver = in.readLong();
        _in_delivery_auto = in.readLong();
        _in_delivery_customer = in.readLong();
        _in_delivery_driver = in.readLong();
        _time_done = in.readLong();
        _is_enabled = in.readByte() != 0;
        _ton_real = in.readDouble();
        _trip = in.readString();
        _driver_accept = in.readLong();
        _pre_order_sum = in.createTypedArrayList(PreOrderSum.CREATOR);
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_id);
        dest.writeString(_pre_sum_time);
        dest.writeString(_name_drivers);
        dest.writeString(_id_drivers);
        dest.writeString(_pre_sum_assign_time);
        dest.writeString(_number_plate);
        dest.writeDouble(_ton_for_vehicle);
        dest.writeDouble(_weigh_for_vehicle);
        dest.writeString(_note_trip);
        dest.writeLong(_time_create);
        dest.writeString(_note_cancel);
        dest.writeLong(_time_cancel);
        dest.writeLong(_start_pickup);
        dest.writeLong(_in_warehouse_auto);
        dest.writeLong(_in_warehouse_guard);
        dest.writeLong(_in_warehouse_driver);
        dest.writeLong(_in_line_driver);
        dest.writeLong(_in_line_manager_warehouse);
        dest.writeLong(_out_line_driver);
        dest.writeLong(_out_line_manager_warehouse);
        dest.writeLong(_out_warehouse_auto);
        dest.writeLong(_out_warehouse_guard);
        dest.writeLong(_out_warehouse_driver);
        dest.writeLong(_in_delivery_auto);
        dest.writeLong(_in_delivery_customer);
        dest.writeLong(_in_delivery_driver);
        dest.writeLong(_time_done);
        dest.writeByte((byte) (_is_enabled ? 1 : 0));
        dest.writeDouble(_ton_real);
        dest.writeString(_trip);
        dest.writeLong(_driver_accept);
        dest.writeTypedList(_pre_order_sum);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<PreOrderSumAssign> CREATOR = new Creator<PreOrderSumAssign>() {
        @Override
        public PreOrderSumAssign createFromParcel(Parcel in) {
            return new PreOrderSumAssign(in);
        }

        @Override
        public PreOrderSumAssign[] newArray(int size) {
            return new PreOrderSumAssign[size];
        }
    };

    public long get_in_delivery_customer() {
        return _in_delivery_customer;
    }

    public void set_in_delivery_customer(long _in_delivery_customer) {
        this._in_delivery_customer = _in_delivery_customer;
    }

    public double get_ton_real() {
        return _ton_real;
    }

    public void set_ton_real(double _ton_real) {
        this._ton_real = _ton_real;
    }

    public String get_trip() {
        return _trip;
    }

    public void set_trip(String _trip) {
        this._trip = _trip;
    }

    public long get_driver_accept() {
        return _driver_accept;
    }

    public void set_driver_accept(long _driver_accept) {
        this._driver_accept = _driver_accept;
    }

    public long get_time_done() {
        return _time_done;
    }

    public void set_time_done(long _time_done) {
        this._time_done = _time_done;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_pre_sum_time() {
        return _pre_sum_time;
    }

    public void set_pre_sum_time(String _pre_sum_time) {
        this._pre_sum_time = _pre_sum_time;
    }

    public String get_name_drivers() {
        return _name_drivers;
    }

    public void set_name_drivers(String _name_drivers) {
        this._name_drivers = _name_drivers;
    }

    public String get_id_drivers() {
        return _id_drivers;
    }

    public void set_id_drivers(String _id_drivers) {
        this._id_drivers = _id_drivers;
    }

    public String get_pre_sum_assign_time() {
        return _pre_sum_assign_time;
    }

    public void set_pre_sum_assign_time(String _pre_sum_assign_time) {
        this._pre_sum_assign_time = _pre_sum_assign_time;
    }

    public String get_number_plate() {
        return _number_plate;
    }

    public void set_number_plate(String _number_plate) {
        this._number_plate = _number_plate;
    }

    public double get_ton_for_vehicle() {
        return _ton_for_vehicle;
    }

    public void set_ton_for_vehicle(double _ton_for_vehicle) {
        this._ton_for_vehicle = _ton_for_vehicle;
    }

    public double get_weigh_for_vehicle() {
        return _weigh_for_vehicle;
    }

    public void set_weigh_for_vehicle(double _weigh_for_vehicle) {
        this._weigh_for_vehicle = _weigh_for_vehicle;
    }

    public String get_note_trip() {
        return _note_trip;
    }

    public void set_note_trip(String _note_trip) {
        this._note_trip = _note_trip;
    }

    public long get_time_create() {
        return _time_create;
    }

    public void set_time_create(long _time_create) {
        this._time_create = _time_create;
    }

    public String get_note_cancel() {
        return _note_cancel;
    }

    public void set_note_cancel(String _note_cancel) {
        this._note_cancel = _note_cancel;
    }

    public long get_time_cancel() {
        return _time_cancel;
    }

    public void set_time_cancel(long _time_cancel) {
        this._time_cancel = _time_cancel;
    }

    public long get_start_pickup() {
        return _start_pickup;
    }

    public void set_start_pickup(long _start_pickup) {
        this._start_pickup = _start_pickup;
    }

    public long get_in_warehouse_auto() {
        return _in_warehouse_auto;
    }

    public void set_in_warehouse_auto(long _in_warehouse_auto) {
        this._in_warehouse_auto = _in_warehouse_auto;
    }

    public long get_in_warehouse_guard() {
        return _in_warehouse_guard;
    }

    public void set_in_warehouse_guard(long _in_warehouse_guard) {
        this._in_warehouse_guard = _in_warehouse_guard;
    }

    public long get_in_warehouse_driver() {
        return _in_warehouse_driver;
    }

    public void set_in_warehouse_driver(long _in_warehouse_driver) {
        this._in_warehouse_driver = _in_warehouse_driver;
    }

    public long get_in_line_driver() {
        return _in_line_driver;
    }

    public void set_in_line_driver(long _in_line_driver) {
        this._in_line_driver = _in_line_driver;
    }

    public long get_in_line_manager_warehouse() {
        return _in_line_manager_warehouse;
    }

    public void set_in_line_manager_warehouse(long _in_line_manager_warehouse) {
        this._in_line_manager_warehouse = _in_line_manager_warehouse;
    }

    public long get_out_line_driver() {
        return _out_line_driver;
    }

    public void set_out_line_driver(long _out_line_driver) {
        this._out_line_driver = _out_line_driver;
    }

    public long get_out_line_manager_warehouse() {
        return _out_line_manager_warehouse;
    }

    public void set_out_line_manager_warehouse(long _out_line_manager_warehouse) {
        this._out_line_manager_warehouse = _out_line_manager_warehouse;
    }

    public long get_out_warehouse_auto() {
        return _out_warehouse_auto;
    }

    public void set_out_warehouse_auto(long _out_warehouse_auto) {
        this._out_warehouse_auto = _out_warehouse_auto;
    }

    public long get_out_warehouse_guard() {
        return _out_warehouse_guard;
    }

    public void set_out_warehouse_guard(long _out_warehouse_guard) {
        this._out_warehouse_guard = _out_warehouse_guard;
    }

    public long get_out_warehouse_driver() {
        return _out_warehouse_driver;
    }

    public void set_out_warehouse_driver(long _out_warehouse_driver) {
        this._out_warehouse_driver = _out_warehouse_driver;
    }

    public long get_in_delivery_auto() {
        return _in_delivery_auto;
    }

    public void set_in_delivery_auto(long _in_delivery_auto) {
        this._in_delivery_auto = _in_delivery_auto;
    }

    public long get_in_delivery_driver() {
        return _in_delivery_driver;
    }

    public void set_in_delivery_driver(long _in_delivery_driver) {
        this._in_delivery_driver = _in_delivery_driver;
    }

    public boolean is_is_enabled() {
        return _is_enabled;
    }

    public void set_is_enabled(boolean _is_enabled) {
        this._is_enabled = _is_enabled;
    }

    public List<PreOrderSum> get_pre_order_sum() {
        return _pre_order_sum;
    }

    public void set_pre_order_sum(List<PreOrderSum> _pre_order_sum) {
        this._pre_order_sum = _pre_order_sum;
    }
}