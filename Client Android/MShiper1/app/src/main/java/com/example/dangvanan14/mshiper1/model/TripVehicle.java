package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.List;

public class TripVehicle implements Parcelable {
    private String _trip;
    private List<PreOrderSumAssign> data;
    private int percent;

    public TripVehicle(String trip, List<PreOrderSumAssign> data, int percent) {
        this._trip = trip;
        this.data = data;
        this.percent = percent;
    }

    public String get_trip() {
        return _trip;
    }

    public void set_trip(String _trip) {
        this._trip = _trip;
    }

    public List<PreOrderSumAssign> getData() {
        return data;
    }

    public void setData(List<PreOrderSumAssign> data) {
        this.data = data;
    }

    public int getPercent() {
        return percent;
    }

    public void setPercent(int percent) {
        this.percent = percent;
    }

    protected TripVehicle(Parcel in) {
        _trip = in.readString();
        data = in.createTypedArrayList(PreOrderSumAssign.CREATOR);
        percent = in.readInt();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_trip);
        dest.writeTypedList(data);
        dest.writeInt(percent);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<TripVehicle> CREATOR = new Creator<TripVehicle>() {
        @Override
        public TripVehicle createFromParcel(Parcel in) {
            return new TripVehicle(in);
        }

        @Override
        public TripVehicle[] newArray(int size) {
            return new TripVehicle[size];
        }
    };
}