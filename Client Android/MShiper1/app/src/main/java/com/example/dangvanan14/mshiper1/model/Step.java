package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class Step implements Parcelable {
    private int _id;
    private String _name;
    private boolean _is_confirm;
    private String element;

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

    public boolean is_confirm() {
        return _is_confirm;
    }

    public void set_is_confirm(boolean _is_confirm) {
        this._is_confirm = _is_confirm;
    }

    public String getElement() {
        return element;
    }

    public void setElement(String element) {
        this.element = element;
    }

    public Step(int _id, String _name, boolean _is_confirm, String element) {
        this._id = _id;
        this._name = _name;
        this._is_confirm = _is_confirm;
        this.element = element;
    }

    protected Step(Parcel in) {
        _id = in.readInt();
        _name = in.readString();
        _is_confirm = in.readByte() != 0;
        element = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(_id);
        dest.writeString(_name);
        dest.writeByte((byte) (_is_confirm ? 1 : 0));
        dest.writeString(element);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Step> CREATOR = new Creator<Step>() {
        @Override
        public Step createFromParcel(Parcel in) {
            return new Step(in);
        }

        @Override
        public Step[] newArray(int size) {
            return new Step[size];
        }
    };
}
