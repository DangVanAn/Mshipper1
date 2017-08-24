package com.example.dangvanan14.mshiper1.response;

import android.os.Parcel;
import android.os.Parcelable;


public class RepPost implements Parcelable {
    private boolean success;
    private String message;
    private String data;

    public RepPost(boolean success, String message, String data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    protected RepPost(Parcel in) {
        success = in.readByte() != 0;
        message = in.readString();
        data = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeByte((byte) (success ? 1 : 0));
        dest.writeString(message);
        dest.writeString(data);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<RepPost> CREATOR = new Creator<RepPost>() {
        @Override
        public RepPost createFromParcel(Parcel in) {
            return new RepPost(in);
        }

        @Override
        public RepPost[] newArray(int size) {
            return new RepPost[size];
        }
    };

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
