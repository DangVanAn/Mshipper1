package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class Order implements Parcelable {
    private String _id;
    private long _created_date;
    private long _expected_date;
    private String _address;
    private String _area_id;
    private String _latitude;
    private String _longitude;
    private String _order_status;
    private String _payment_status;
    private String _note;

    public Order(String _id, long _created_date, long _expected_date, String _address, String _area_id, String _latitude, String _longitude, String _order_status, String _payment_status, String _note) {
        this._id = _id;
        this._created_date = _created_date;
        this._expected_date = _expected_date;
        this._address = _address;
        this._area_id = _area_id;
        this._latitude = _latitude;
        this._longitude = _longitude;
        this._order_status = _order_status;
        this._payment_status = _payment_status;
        this._note = _note;
    }

    protected Order(Parcel in) {
        _id = in.readString();
        _created_date = in.readLong();
        _expected_date = in.readLong();
        _address = in.readString();
        _area_id = in.readString();
        _latitude = in.readString();
        _longitude = in.readString();
        _order_status = in.readString();
        _payment_status = in.readString();
        _note = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_id);
        dest.writeLong(_created_date);
        dest.writeLong(_expected_date);
        dest.writeString(_address);
        dest.writeString(_area_id);
        dest.writeString(_latitude);
        dest.writeString(_longitude);
        dest.writeString(_order_status);
        dest.writeString(_payment_status);
        dest.writeString(_note);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Order> CREATOR = new Creator<Order>() {
        @Override
        public Order createFromParcel(Parcel in) {
            return new Order(in);
        }

        @Override
        public Order[] newArray(int size) {
            return new Order[size];
        }
    };

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public long get_created_date() {
        return _created_date;
    }

    public void set_created_date(long _created_date) {
        this._created_date = _created_date;
    }

    public long get_expected_date() {
        return _expected_date;
    }

    public void set_expected_date(long _expected_date) {
        this._expected_date = _expected_date;
    }

    public String get_address() {
        return _address;
    }

    public void set_address(String _address) {
        this._address = _address;
    }

    public String get_area_id() {
        return _area_id;
    }

    public void set_area_id(String _area_id) {
        this._area_id = _area_id;
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

    public String get_order_status() {
        return _order_status;
    }

    public void set_order_status(String _order_status) {
        this._order_status = _order_status;
    }

    public String get_payment_status() {
        return _payment_status;
    }

    public void set_payment_status(String _payment_status) {
        this._payment_status = _payment_status;
    }

    public String get_note() {
        return _note;
    }

    public void set_note(String _note) {
        this._note = _note;
    }
}
