package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.List;

public class LocationCustom implements Parcelable {
    private double _latitude;
    private double _longitude;
    private long _timestamp;
    private String _delivery_man;
    private List<String> _pre_order_sum_assign;
    private String _number_plate;
    private String _trip;

    public LocationCustom(double _latitude, double _longitude, long _timestamp, String _delivery_man, List<String> _pre_order_sum_assign, String _number_plate, String _trip) {
        this._latitude = _latitude;
        this._longitude = _longitude;
        this._timestamp = _timestamp;
        this._delivery_man = _delivery_man;
        this._pre_order_sum_assign = _pre_order_sum_assign;
        this._number_plate = _number_plate;
        this._trip = _trip;
    }

    protected LocationCustom(Parcel in) {
        _latitude = in.readDouble();
        _longitude = in.readDouble();
        _timestamp = in.readLong();
        _delivery_man = in.readString();
        _pre_order_sum_assign = in.createStringArrayList();
        _number_plate = in.readString();
        _trip = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeDouble(_latitude);
        dest.writeDouble(_longitude);
        dest.writeLong(_timestamp);
        dest.writeString(_delivery_man);
        dest.writeStringList(_pre_order_sum_assign);
        dest.writeString(_number_plate);
        dest.writeString(_trip);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public String get_trip() {
        return _trip;
    }

    public void set_trip(String _trip) {
        this._trip = _trip;
    }

    public static final Creator<LocationCustom> CREATOR = new Creator<LocationCustom>() {
        @Override
        public LocationCustom createFromParcel(Parcel in) {
            return new LocationCustom(in);
        }

        @Override
        public LocationCustom[] newArray(int size) {
            return new LocationCustom[size];
        }
    };

    public String get_number_plate() {
        return _number_plate;
    }

    public void set_number_plate(String _number_plate) {
        this._number_plate = _number_plate;
    }

    public List<String> get_pre_order_sum_assign() {
        return _pre_order_sum_assign;
    }

    public void set_pre_order_sum_assign(List<String> _pre_order_sum_assign) {
        this._pre_order_sum_assign = _pre_order_sum_assign;
    }

    public double get_latitude() {
        return _latitude;
    }

    public void set_latitude(double _latitude) {
        this._latitude = _latitude;
    }

    public double get_longitude() {
        return _longitude;
    }

    public void set_longitude(double _longitude) {
        this._longitude = _longitude;
    }

    public long get_timestamp() {
        return _timestamp;
    }

    public void set_timestamp(long _timestamp) {
        this._timestamp = _timestamp;
    }

    public String get_delivery_man() {
        return _delivery_man;
    }

    public void set_delivery_man(String _delivery_man) {
        this._delivery_man = _delivery_man;
    }
}
