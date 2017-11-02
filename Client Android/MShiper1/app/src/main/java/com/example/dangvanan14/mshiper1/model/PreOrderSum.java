package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.List;

public class PreOrderSum implements Parcelable {
    private String _id;
    private String _id_warehouse;
    private String _address_warehouse;
    private String _id_delivery;
    private String _id_customer;
    private String _address_delivery;
    private String _type_product;
    private double _ton;
    private double _ton_action;
    private String _etd;
    private String _eta;
    private String _note;
    private String _id_delivery_manager;
    private long _time_send;
    private String _pre_sum_time;
    private long _time_update;
    private String _note_update;
    private long _time_accept;
    private long _time_refuse;
    private String _note_refuse;
    private String _note_accept;
    private long _time_cancel;
    private String _note_cancel;
    private String _user_cancel;
    private long _time_cancel_delivery;
    private String _note_cancel_delivery;
    private String _user_cancel_delivery;
    private String _user_refuse;
    private String _user_accept;
    private boolean _is_enabled;


    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_id_warehouse() {
        return _id_warehouse;
    }

    public void set_id_warehouse(String _id_warehouse) {
        this._id_warehouse = _id_warehouse;
    }

    public String get_address_warehouse() {
        return _address_warehouse;
    }

    public void set_address_warehouse(String _address_warehouse) {
        this._address_warehouse = _address_warehouse;
    }

    public String get_id_delivery() {
        return _id_delivery;
    }

    public void set_id_delivery(String _id_delivery) {
        this._id_delivery = _id_delivery;
    }

    public String get_id_customer() {
        return _id_customer;
    }

    public void set_id_customer(String _id_customer) {
        this._id_customer = _id_customer;
    }

    public String get_address_delivery() {
        return _address_delivery;
    }

    public void set_address_delivery(String _address_delivery) {
        this._address_delivery = _address_delivery;
    }

    public String get_type_product() {
        return _type_product;
    }

    public void set_type_product(String _type_product) {
        this._type_product = _type_product;
    }

    public double get_ton() {
        return _ton;
    }

    public void set_ton(double _ton) {
        this._ton = _ton;
    }

    public double get_ton_action() {
        return _ton_action;
    }

    public void set_ton_action(double _ton_action) {
        this._ton_action = _ton_action;
    }

    public String get_etd() {
        return _etd;
    }

    public void set_etd(String _etd) {
        this._etd = _etd;
    }

    public String get_eta() {
        return _eta;
    }

    public void set_eta(String _eta) {
        this._eta = _eta;
    }

    public String get_note() {
        return _note;
    }

    public void set_note(String _note) {
        this._note = _note;
    }

    public String get_id_delivery_manager() {
        return _id_delivery_manager;
    }

    public void set_id_delivery_manager(String _id_delivery_manager) {
        this._id_delivery_manager = _id_delivery_manager;
    }

    public long get_time_send() {
        return _time_send;
    }

    public void set_time_send(long _time_send) {
        this._time_send = _time_send;
    }

    public String get_pre_sum_time() {
        return _pre_sum_time;
    }

    public void set_pre_sum_time(String _pre_sum_time) {
        this._pre_sum_time = _pre_sum_time;
    }

    public long get_time_update() {
        return _time_update;
    }

    public void set_time_update(long _time_update) {
        this._time_update = _time_update;
    }

    public String get_note_update() {
        return _note_update;
    }

    public void set_note_update(String _note_update) {
        this._note_update = _note_update;
    }

    public long get_time_accept() {
        return _time_accept;
    }

    public void set_time_accept(long _time_accept) {
        this._time_accept = _time_accept;
    }

    public long get_time_refuse() {
        return _time_refuse;
    }

    public void set_time_refuse(long _time_refuse) {
        this._time_refuse = _time_refuse;
    }

    public String get_note_refuse() {
        return _note_refuse;
    }

    public void set_note_refuse(String _note_refuse) {
        this._note_refuse = _note_refuse;
    }

    public String get_note_accept() {
        return _note_accept;
    }

    public void set_note_accept(String _note_accept) {
        this._note_accept = _note_accept;
    }

    public long get_time_cancel() {
        return _time_cancel;
    }

    public void set_time_cancel(long _time_cancel) {
        this._time_cancel = _time_cancel;
    }

    public String get_note_cancel() {
        return _note_cancel;
    }

    public void set_note_cancel(String _note_cancel) {
        this._note_cancel = _note_cancel;
    }

    public String get_user_cancel() {
        return _user_cancel;
    }

    public void set_user_cancel(String _user_cancel) {
        this._user_cancel = _user_cancel;
    }

    public long get_time_cancel_delivery() {
        return _time_cancel_delivery;
    }

    public void set_time_cancel_delivery(long _time_cancel_delivery) {
        this._time_cancel_delivery = _time_cancel_delivery;
    }

    public String get_note_cancel_delivery() {
        return _note_cancel_delivery;
    }

    public void set_note_cancel_delivery(String _note_cancel_delivery) {
        this._note_cancel_delivery = _note_cancel_delivery;
    }

    public String get_user_cancel_delivery() {
        return _user_cancel_delivery;
    }

    public void set_user_cancel_delivery(String _user_cancel_delivery) {
        this._user_cancel_delivery = _user_cancel_delivery;
    }

    public String get_user_refuse() {
        return _user_refuse;
    }

    public void set_user_refuse(String _user_refuse) {
        this._user_refuse = _user_refuse;
    }

    public String get_user_accept() {
        return _user_accept;
    }

    public void set_user_accept(String _user_accept) {
        this._user_accept = _user_accept;
    }

    public boolean is_is_enabled() {
        return _is_enabled;
    }

    public void set_is_enabled(boolean _is_enabled) {
        this._is_enabled = _is_enabled;
    }

    protected PreOrderSum(Parcel in) {
        _id = in.readString();
        _id_warehouse = in.readString();
        _address_warehouse = in.readString();
        _id_delivery = in.readString();
        _id_customer = in.readString();
        _address_delivery = in.readString();
        _type_product = in.readString();
        _ton = in.readDouble();
        _ton_action = in.readDouble();
        _etd = in.readString();
        _eta = in.readString();
        _note = in.readString();
        _id_delivery_manager = in.readString();
        _time_send = in.readLong();
        _pre_sum_time = in.readString();
        _time_update = in.readLong();
        _note_update = in.readString();
        _time_accept = in.readLong();
        _time_refuse = in.readLong();
        _note_refuse = in.readString();
        _note_accept = in.readString();
        _time_cancel = in.readLong();
        _note_cancel = in.readString();
        _user_cancel = in.readString();
        _time_cancel_delivery = in.readLong();
        _note_cancel_delivery = in.readString();
        _user_cancel_delivery = in.readString();
        _user_refuse = in.readString();
        _user_accept = in.readString();
        _is_enabled = in.readByte() != 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_id);
        dest.writeString(_id_warehouse);
        dest.writeString(_address_warehouse);
        dest.writeString(_id_delivery);
        dest.writeString(_id_customer);
        dest.writeString(_address_delivery);
        dest.writeString(_type_product);
        dest.writeDouble(_ton);
        dest.writeDouble(_ton_action);
        dest.writeString(_etd);
        dest.writeString(_eta);
        dest.writeString(_note);
        dest.writeString(_id_delivery_manager);
        dest.writeLong(_time_send);
        dest.writeString(_pre_sum_time);
        dest.writeLong(_time_update);
        dest.writeString(_note_update);
        dest.writeLong(_time_accept);
        dest.writeLong(_time_refuse);
        dest.writeString(_note_refuse);
        dest.writeString(_note_accept);
        dest.writeLong(_time_cancel);
        dest.writeString(_note_cancel);
        dest.writeString(_user_cancel);
        dest.writeLong(_time_cancel_delivery);
        dest.writeString(_note_cancel_delivery);
        dest.writeString(_user_cancel_delivery);
        dest.writeString(_user_refuse);
        dest.writeString(_user_accept);
        dest.writeByte((byte) (_is_enabled ? 1 : 0));
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<PreOrderSum> CREATOR = new Creator<PreOrderSum>() {
        @Override
        public PreOrderSum createFromParcel(Parcel in) {
            return new PreOrderSum(in);
        }

        @Override
        public PreOrderSum[] newArray(int size) {
            return new PreOrderSum[size];
        }
    };
}