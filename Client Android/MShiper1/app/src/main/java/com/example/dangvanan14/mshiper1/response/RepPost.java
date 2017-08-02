package com.example.dangvanan14.mshiper1.response;

import android.os.Parcel;
import android.os.Parcelable;


public class RepPost implements Parcelable {
    private String success;
    private String message;

    public RepPost(String success, String message) {
        this.success = success;
        this.message = message;
    }

    protected RepPost(Parcel in) {
        success = in.readString();
        message = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(success);
        dest.writeString(message);
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

    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
