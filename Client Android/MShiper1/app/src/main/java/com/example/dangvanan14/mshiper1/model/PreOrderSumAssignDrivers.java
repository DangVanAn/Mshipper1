package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class PreOrderSumAssignDrivers implements Parcelable {
    private String _pre_sum_assign_time;
    private String _driver;
    private String _name_driver;
    private String _phone_driver;
    private long _driver_accept;
    private boolean _lead_driver;
    private boolean _is_enabled;

    public PreOrderSumAssignDrivers(String _driver) {
        this._driver = _driver;
    }

    protected PreOrderSumAssignDrivers(Parcel in) {
        _pre_sum_assign_time = in.readString();
        _driver = in.readString();
        _name_driver = in.readString();
        _phone_driver = in.readString();
        _driver_accept = in.readLong();
        _lead_driver = in.readByte() != 0;
        _is_enabled = in.readByte() != 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_pre_sum_assign_time);
        dest.writeString(_driver);
        dest.writeString(_name_driver);
        dest.writeString(_phone_driver);
        dest.writeLong(_driver_accept);
        dest.writeByte((byte) (_lead_driver ? 1 : 0));
        dest.writeByte((byte) (_is_enabled ? 1 : 0));
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<PreOrderSumAssignDrivers> CREATOR = new Creator<PreOrderSumAssignDrivers>() {
        @Override
        public PreOrderSumAssignDrivers createFromParcel(Parcel in) {
            return new PreOrderSumAssignDrivers(in);
        }

        @Override
        public PreOrderSumAssignDrivers[] newArray(int size) {
            return new PreOrderSumAssignDrivers[size];
        }
    };

    public PreOrderSumAssignDrivers(String _pre_sum_assign_time, String _driver, String _name_driver, String _phone_driver, long _driver_accept, boolean _lead_driver, boolean _is_enabled) {
        this._pre_sum_assign_time = _pre_sum_assign_time;
        this._driver = _driver;
        this._name_driver = _name_driver;
        this._phone_driver = _phone_driver;
        this._driver_accept = _driver_accept;
        this._lead_driver = _lead_driver;
        this._is_enabled = _is_enabled;
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

    public void set_driver_accept(long _driver_accept) {
        this._driver_accept = _driver_accept;
    }

    public boolean is_lead_driver() {
        return _lead_driver;
    }

    public void set_lead_driver(boolean _lead_driver) {
        this._lead_driver = _lead_driver;
    }

    public boolean is_is_enabled() {
        return _is_enabled;
    }

    public void set_is_enabled(boolean _is_enabled) {
        this._is_enabled = _is_enabled;
    }
}
