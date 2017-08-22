package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class LocationCustom implements Parcelable {

    private double _latitude;
    private double _longitude;
    private long _timestamp;
    private String _delivery_man;

    public LocationCustom(double _latitude, double _longitude, long _timestamp, String _delivery_man) {
        this._latitude = _latitude;
        this._longitude = _longitude;
        this._timestamp = _timestamp;
        this._delivery_man = _delivery_man;
    }

    protected LocationCustom(Parcel in) {
        _latitude = in.readDouble();
        _longitude = in.readDouble();
        _timestamp = in.readLong();
        _delivery_man = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeDouble(_latitude);
        dest.writeDouble(_longitude);
        dest.writeLong(_timestamp);
        dest.writeString(_delivery_man);
    }

    @Override
    public int describeContents() {
        return 0;
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
