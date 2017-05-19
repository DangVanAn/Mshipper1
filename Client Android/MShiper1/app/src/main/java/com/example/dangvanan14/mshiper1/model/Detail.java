package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class Detail implements Parcelable {
    private String _id_package = "";
    private String _order_id = "";
    private float _total_pay = 0;
    private String _pay_type = "";
    private float _weight = 0;
    private String _package_type = "";
    private long _delivery_daytime = 0;
    private String _latitude_update = "";
    private String _longitude_update = "";
    private String _signature = "";
    private String _status = "";
    private String _photo = "";

    public Detail() {
    }

    public Detail(String _id_package, String _order_id, float _total_pay, String _pay_type, float _weight, String _package_type, long _delivery_daytime, String _latitude_update, String _longitude_update, String _signature, String _status, String _photo) {
        this._id_package = _id_package;
        this._order_id = _order_id;
        this._total_pay = _total_pay;
        this._pay_type = _pay_type;
        this._weight = _weight;
        this._package_type = _package_type;
        this._delivery_daytime = _delivery_daytime;
        this._latitude_update = _latitude_update;
        this._longitude_update = _longitude_update;
        this._signature = _signature;
        this._status = _status;
        this._photo = _photo;
    }

    public String get_id_package() {
        return _id_package;
    }

    public void set_id_package(String _id_package) {
        this._id_package = _id_package;
    }

    public String get_order_id() {
        return _order_id;
    }

    public void set_order_id(String _order_id) {
        this._order_id = _order_id;
    }

    public float get_total_pay() {
        return _total_pay;
    }

    public void set_total_pay(float _total_pay) {
        this._total_pay = _total_pay;
    }

    public String get_pay_type() {
        return _pay_type;
    }

    public void set_pay_type(String _pay_type) {
        this._pay_type = _pay_type;
    }

    public float get_weight() {
        return _weight;
    }

    public void set_weight(float _weight) {
        this._weight = _weight;
    }

    public String get_package_type() {
        return _package_type;
    }

    public void set_package_type(String _package_type) {
        this._package_type = _package_type;
    }

    public long get_delivery_daytime() {
        return _delivery_daytime;
    }

    public void set_delivery_daytime(long _delivery_daytime) {
        this._delivery_daytime = _delivery_daytime;
    }

    public String get_latitude_update() {
        return _latitude_update;
    }

    public void set_latitude_update(String _latitude_update) {
        this._latitude_update = _latitude_update;
    }

    public String get_longitude_update() {
        return _longitude_update;
    }

    public void set_longitude_update(String _longitude_update) {
        this._longitude_update = _longitude_update;
    }

    public String get_signature() {
        return _signature;
    }

    public void set_signature(String _signature) {
        this._signature = _signature;
    }

    public String get_status() {
        return _status;
    }

    public void set_status(String _status) {
        this._status = _status;
    }

    public String get_photo() {
        return _photo;
    }

    public void set_photo(String _photo) {
        this._photo = _photo;
    }

    protected Detail(Parcel in) {
        _id_package = in.readString();
        _order_id = in.readString();
        _total_pay = in.readFloat();
        _pay_type = in.readString();
        _weight = in.readFloat();
        _package_type = in.readString();
        _delivery_daytime = in.readLong();
        _latitude_update = in.readString();
        _longitude_update = in.readString();
        _signature = in.readString();
        _status = in.readString();
        _photo = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_id_package);
        dest.writeString(_order_id);
        dest.writeFloat(_total_pay);
        dest.writeString(_pay_type);
        dest.writeFloat(_weight);
        dest.writeString(_package_type);
        dest.writeLong(_delivery_daytime);
        dest.writeString(_latitude_update);
        dest.writeString(_longitude_update);
        dest.writeString(_signature);
        dest.writeString(_status);
        dest.writeString(_photo);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Detail> CREATOR = new Creator<Detail>() {
        @Override
        public Detail createFromParcel(Parcel in) {
            return new Detail(in);
        }

        @Override
        public Detail[] newArray(int size) {
            return new Detail[size];
        }
    };
}
