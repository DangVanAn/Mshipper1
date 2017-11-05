package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.List;

public class Trip implements Parcelable {
    private String trip;
    private List<AssignDriver> data;
    private int percent;

    public Trip(String trip, List<AssignDriver> data) {
        this.trip = trip;
        this.data = data;
    }

    public int getPercent() {
        return percent;
    }

    public void setPercent(int percent) {
        this.percent = percent;
    }

    protected Trip(Parcel in) {
        trip = in.readString();
        data = in.createTypedArrayList(AssignDriver.CREATOR);
        percent = in.readInt();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(trip);
        dest.writeTypedList(data);
        dest.writeInt(percent);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Trip> CREATOR = new Creator<Trip>() {
        @Override
        public Trip createFromParcel(Parcel in) {
            return new Trip(in);
        }

        @Override
        public Trip[] newArray(int size) {
            return new Trip[size];
        }
    };

    public String getTrip() {
        return trip;
    }

    public void setTrip(String trip) {
        this.trip = trip;
    }

    public List<AssignDriver> getData() {
        return data;
    }

    public void setData(List<AssignDriver> data) {
        this.data = data;
    }
}