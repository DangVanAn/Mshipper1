package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class GroupChat implements Parcelable {
    private String _id;
    private String _group_name;

    protected GroupChat(Parcel in) {
        _id = in.readString();
        _group_name = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_id);
        dest.writeString(_group_name);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<GroupChat> CREATOR = new Creator<GroupChat>() {
        @Override
        public GroupChat createFromParcel(Parcel in) {
            return new GroupChat(in);
        }

        @Override
        public GroupChat[] newArray(int size) {
            return new GroupChat[size];
        }
    };

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_group_name() {
        return _group_name;
    }

    public void set_group_name(String _group_name) {
        this._group_name = _group_name;
    }

    public GroupChat(String _id, String _group_name) {
        this._id = _id;
        this._group_name = _group_name;
    }
}