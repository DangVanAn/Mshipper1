package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class GroupChatMember implements Parcelable {
    private String _id;
    private String _group_id;
    private String _user_id;
    private boolean _is_enable;

    protected GroupChatMember(Parcel in) {
        _id = in.readString();
        _group_id = in.readString();
        _user_id = in.readString();
        _is_enable = in.readByte() != 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_id);
        dest.writeString(_group_id);
        dest.writeString(_user_id);
        dest.writeByte((byte) (_is_enable ? 1 : 0));
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<GroupChatMember> CREATOR = new Creator<GroupChatMember>() {
        @Override
        public GroupChatMember createFromParcel(Parcel in) {
            return new GroupChatMember(in);
        }

        @Override
        public GroupChatMember[] newArray(int size) {
            return new GroupChatMember[size];
        }
    };

    public GroupChatMember(String _id, String _group_id, String _user_id, boolean _is_enable) {
        this._id = _id;
        this._group_id = _group_id;
        this._user_id = _user_id;
        this._is_enable = _is_enable;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_group_id() {
        return _group_id;
    }

    public void set_group_id(String _group_id) {
        this._group_id = _group_id;
    }

    public String get_user_id() {
        return _user_id;
    }

    public void set_user_id(String _user_id) {
        this._user_id = _user_id;
    }

    public boolean is_is_enable() {
        return _is_enable;
    }

    public void set_is_enable(boolean _is_enable) {
        this._is_enable = _is_enable;
    }
}
