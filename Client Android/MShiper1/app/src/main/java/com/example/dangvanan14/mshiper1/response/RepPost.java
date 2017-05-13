package com.example.dangvanan14.mshiper1.response;

import android.os.Parcel;
import android.os.Parcelable;


public class RepPost implements Parcelable {
    private String rep;

    protected RepPost(Parcel in) {
        rep = in.readString();
    }

    public String getRep() {
        return rep;
    }

    public void setRep(String rep) {
        this.rep = rep;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(rep);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Parcelable.Creator<RepPost> CREATOR = new Parcelable.Creator<RepPost>() {
        @Override
        public RepPost createFromParcel(Parcel in) {
            return new RepPost(in);
        }

        @Override
        public RepPost[] newArray(int size) {
            return new RepPost[size];
        }
    };
}
