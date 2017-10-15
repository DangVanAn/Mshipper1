package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class More implements Parcelable {
    private int _id;
    private String _name;

    public More(int _id, String _name) {
        this._id = _id;
        this._name = _name;
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    protected More(Parcel in) {
        _id = in.readInt();
        _name = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(_id);
        dest.writeString(_name);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<More> CREATOR = new Creator<More>() {
        @Override
        public More createFromParcel(Parcel in) {
            return new More(in);
        }

        @Override
        public More[] newArray(int size) {
            return new More[size];
        }
    };
}