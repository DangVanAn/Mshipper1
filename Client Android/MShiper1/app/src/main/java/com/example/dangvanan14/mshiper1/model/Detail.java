package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by Sherman on 3/15/2017.
 */

public class Detail implements Parcelable {
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    private String time;
    private int state;
    private String name;
    private String money;

    public Detail(String id, String time, int state, String name, String money) {
        this.id = id;
        this.time = time;
        this.state = state;
        this.name = name;
        this.money = money;
    }

    protected Detail(Parcel in) {
        id = in.readString();
        time = in.readString();
        state = in.readInt();
        name = in.readString();
        money = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(id);
        dest.writeString(time);
        dest.writeInt(state);
        dest.writeString(name);
        dest.writeString(money);
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
