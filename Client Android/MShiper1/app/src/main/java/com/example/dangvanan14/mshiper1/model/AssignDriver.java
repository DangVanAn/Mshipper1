package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.List;

public class AssignDriver implements Parcelable {
    private String _id;
    private String _pre_sum_assign_time;
    private String _driver;
    private String _name_driver;
    private String _phone_driver;
    private long _driver_accept;
    private boolean _lead_driver;
    private String _time_cancel;
    private String _note_cancel;
    private boolean _is_enabled;
    private List<AssignDriver> _other_driver;
    private List<PreOrderSumAssign> _pre_order_sum_assign;

    public AssignDriver(String _id, String _pre_sum_assign_time, String _driver, String _name_driver, String _phone_driver, long _driver_accept, boolean _lead_driver, String _time_cancel, String _note_cancel, boolean _is_enabled, List<AssignDriver> _other_driver, List<PreOrderSumAssign> _pre_order_sum_assign) {
        this._id = _id;
        this._pre_sum_assign_time = _pre_sum_assign_time;
        this._driver = _driver;
        this._name_driver = _name_driver;
        this._phone_driver = _phone_driver;
        this._driver_accept = _driver_accept;
        this._lead_driver = _lead_driver;
        this._time_cancel = _time_cancel;
        this._note_cancel = _note_cancel;
        this._is_enabled = _is_enabled;
        this._other_driver = _other_driver;
        this._pre_order_sum_assign = _pre_order_sum_assign;
    }

    protected AssignDriver(Parcel in) {
        _id = in.readString();
        _pre_sum_assign_time = in.readString();
        _driver = in.readString();
        _name_driver = in.readString();
        _phone_driver = in.readString();
        _driver_accept = in.readLong();
        _lead_driver = in.readByte() != 0;
        _time_cancel = in.readString();
        _note_cancel = in.readString();
        _is_enabled = in.readByte() != 0;
        _other_driver = in.createTypedArrayList(AssignDriver.CREATOR);
        _pre_order_sum_assign = in.createTypedArrayList(PreOrderSumAssign.CREATOR);
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_id);
        dest.writeString(_pre_sum_assign_time);
        dest.writeString(_driver);
        dest.writeString(_name_driver);
        dest.writeString(_phone_driver);
        dest.writeLong(_driver_accept);
        dest.writeByte((byte) (_lead_driver ? 1 : 0));
        dest.writeString(_time_cancel);
        dest.writeString(_note_cancel);
        dest.writeByte((byte) (_is_enabled ? 1 : 0));
        dest.writeTypedList(_other_driver);
        dest.writeTypedList(_pre_order_sum_assign);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<AssignDriver> CREATOR = new Creator<AssignDriver>() {
        @Override
        public AssignDriver createFromParcel(Parcel in) {
            return new AssignDriver(in);
        }

        @Override
        public AssignDriver[] newArray(int size) {
            return new AssignDriver[size];
        }
    };

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_pre_sum_assign_time() {
        return _pre_sum_assign_time;
    }

    public void set_pre_sum_assign_time(String _pre_sum_assign_time) {
        this._pre_sum_assign_time = _pre_sum_assign_time;
    }

    public String get_driver() {
        return _driver;
    }

    public void set_driver(String _driver) {
        this._driver = _driver;
    }

    public String get_name_driver() {
        return _name_driver;
    }

    public void set_name_driver(String _name_driver) {
        this._name_driver = _name_driver;
    }

    public String get_phone_driver() {
        return _phone_driver;
    }

    public void set_phone_driver(String _phone_driver) {
        this._phone_driver = _phone_driver;
    }

    public long get_driver_accept() {
        return _driver_accept;
    }

    public void set_driver_accept(int _driver_accept) {
        this._driver_accept = _driver_accept;
    }

    public boolean is_lead_driver() {
        return _lead_driver;
    }

    public void set_lead_driver(boolean _lead_driver) {
        this._lead_driver = _lead_driver;
    }

    public String get_time_cancel() {
        return _time_cancel;
    }

    public void set_time_cancel(String _time_cancel) {
        this._time_cancel = _time_cancel;
    }

    public String get_note_cancel() {
        return _note_cancel;
    }

    public void set_note_cancel(String _note_cancel) {
        this._note_cancel = _note_cancel;
    }

    public boolean is_enabled() {
        return _is_enabled;
    }

    public void set_is_enabled(boolean _is_enabled) {
        this._is_enabled = _is_enabled;
    }

    public List<AssignDriver> get_other_driver() {
        return _other_driver;
    }

    public void set_other_driver(List<AssignDriver> _other_driver) {
        this._other_driver = _other_driver;
    }

    public List<PreOrderSumAssign> get_pre_order_sum_assign() {
        return _pre_order_sum_assign;
    }

    public void set_pre_order_sum_assign(List<PreOrderSumAssign> _pre_order_sum_assign) {
        this._pre_order_sum_assign = _pre_order_sum_assign;
    }
}