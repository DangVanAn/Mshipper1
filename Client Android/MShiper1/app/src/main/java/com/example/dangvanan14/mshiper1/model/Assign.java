package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class Assign implements Parcelable {
    private String _order_id;
    private String _assign_man;
    private String _delivery_man;
    private long _datetime;
    private String _status;
    private String _note;

    public Assign(String _order_id, String _assign_man, String _delivery_man, long _datetime, String _status, String _note) {
        this._order_id = _order_id;
        this._assign_man = _assign_man;
        this._delivery_man = _delivery_man;
        this._datetime = _datetime;
        this._status = _status;
        this._note = _note;
    }

    protected Assign(Parcel in) {
        _order_id = in.readString();
        _assign_man = in.readString();
        _delivery_man = in.readString();
        _datetime = in.readLong();
        _status = in.readString();
        _note = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_order_id);
        dest.writeString(_assign_man);
        dest.writeString(_delivery_man);
        dest.writeLong(_datetime);
        dest.writeString(_status);
        dest.writeString(_note);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Assign> CREATOR = new Creator<Assign>() {
        @Override
        public Assign createFromParcel(Parcel in) {
            return new Assign(in);
        }

        @Override
        public Assign[] newArray(int size) {
            return new Assign[size];
        }
    };

    public String get_order_id() {

        return _order_id;
    }

    public void set_order_id(String _order_id) {
        this._order_id = _order_id;
    }

    public String get_assign_man() {
        return _assign_man;
    }

    public void set_assign_man(String _assign_man) {
        this._assign_man = _assign_man;
    }

    public String get_delivery_man() {
        return _delivery_man;
    }

    public void set_delivery_man(String _delivery_man) {
        this._delivery_man = _delivery_man;
    }

    public long get_datetime() {
        return _datetime;
    }

    public void set_datetime(long _datetime) {
        this._datetime = _datetime;
    }

    public String get_status() {
        return _status;
    }

    public void set_status(String _status) {
        this._status = _status;
    }

    public String get_note() {
        return _note;
    }

    public void set_note(String _note) {
        this._note = _note;
    }
}
