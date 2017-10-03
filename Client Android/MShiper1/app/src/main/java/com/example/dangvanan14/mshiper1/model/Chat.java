package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class Chat implements Parcelable{
    private String _id;
    private String _message;
    private String _sender;
    private String _receiver;
    private long _timestamp_sender;
    private long _timestamp_receiver;
    private boolean _is_group;
    private String _group_id;
    private boolean _is_enable;

    protected Chat(Parcel in) {
        _id = in.readString();
        _message = in.readString();
        _sender = in.readString();
        _receiver = in.readString();
        _timestamp_sender = in.readLong();
        _timestamp_receiver = in.readLong();
        _is_group = in.readByte() != 0;
        _group_id = in.readString();
        _is_enable = in.readByte() != 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_id);
        dest.writeString(_message);
        dest.writeString(_sender);
        dest.writeString(_receiver);
        dest.writeLong(_timestamp_sender);
        dest.writeLong(_timestamp_receiver);
        dest.writeByte((byte) (_is_group ? 1 : 0));
        dest.writeString(_group_id);
        dest.writeByte((byte) (_is_enable ? 1 : 0));
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Chat> CREATOR = new Creator<Chat>() {
        @Override
        public Chat createFromParcel(Parcel in) {
            return new Chat(in);
        }

        @Override
        public Chat[] newArray(int size) {
            return new Chat[size];
        }
    };

    public Chat(String _id, String _message, String _sender, String _receiver, long _timestamp_sender, long _timestamp_receiver, boolean _is_group, String _group_id, boolean _is_enable) {
        this._id = _id;
        this._message = _message;
        this._sender = _sender;
        this._receiver = _receiver;
        this._timestamp_sender = _timestamp_sender;
        this._timestamp_receiver = _timestamp_receiver;
        this._is_group = _is_group;
        this._group_id = _group_id;
        this._is_enable = _is_enable;
    }

    public Chat(String _message, String _sender, long _timestamp_sender) {
        this._message = _message;
        this._sender = _sender;
        this._timestamp_sender = _timestamp_sender;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_message() {
        return _message;
    }

    public void set_message(String _message) {
        this._message = _message;
    }

    public String get_sender() {
        return _sender;
    }

    public void set_sender(String _sender) {
        this._sender = _sender;
    }

    public String get_receiver() {
        return _receiver;
    }

    public void set_receiver(String _receiver) {
        this._receiver = _receiver;
    }

    public long get_timestamp_sender() {
        return _timestamp_sender;
    }

    public void set_timestamp_sender(long _timestamp_sender) {
        this._timestamp_sender = _timestamp_sender;
    }

    public long get_timestamp_receiver() {
        return _timestamp_receiver;
    }

    public void set_timestamp_receiver(long _timestamp_receiver) {
        this._timestamp_receiver = _timestamp_receiver;
    }

    public boolean is_is_group() {
        return _is_group;
    }

    public void set_is_group(boolean _is_group) {
        this._is_group = _is_group;
    }

    public String get_group_id() {
        return _group_id;
    }

    public void set_group_id(String _group_id) {
        this._group_id = _group_id;
    }

    public boolean is_is_enable() {
        return _is_enable;
    }

    public void set_is_enable(boolean _is_enable) {
        this._is_enable = _is_enable;
    }
}
