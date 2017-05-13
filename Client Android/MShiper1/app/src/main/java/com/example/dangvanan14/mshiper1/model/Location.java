package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class Location implements Parcelable {

    private String _latitude;
    private String _longitude;
    private String _timestamp;
    private String _delivery_man;

    public Location(String _latitude, String _longitude, String _timestamp, String _delivery_man) {
        this._latitude = _latitude;
        this._longitude = _longitude;
        this._timestamp = _timestamp;
        this._delivery_man = _delivery_man;
    }

    public String get_latitude() {

        return _latitude;
    }

    public void set_latitude(String _latitude) {
        this._latitude = _latitude;
    }

    public String get_longitude() {
        return _longitude;
    }

    public void set_longitude(String _longitude) {
        this._longitude = _longitude;
    }

    public String get_timestamp() {
        return _timestamp;
    }

    public void set_timestamp(String _timestamp) {
        this._timestamp = _timestamp;
    }

    public String get_delivery_man() {
        return _delivery_man;
    }

    public void set_delivery_man(String _delivery_man) {
        this._delivery_man = _delivery_man;
    }

    protected Location(Parcel in) {
        _latitude = in.readString();
        _longitude = in.readString();
        _timestamp = in.readString();
        _delivery_man = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_latitude);
        dest.writeString(_longitude);
        dest.writeString(_timestamp);
        dest.writeString(_delivery_man);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Location> CREATOR = new Creator<Location>() {
        @Override
        public Location createFromParcel(Parcel in) {
            return new Location(in);
        }

        @Override
        public Location[] newArray(int size) {
            return new Location[size];
        }
    };
}
