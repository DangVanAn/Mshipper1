package com.example.dangvanan14.mshiper1.application;

import android.app.Application;

import com.example.dangvanan14.mshiper1.model.Order;
import com.example.dangvanan14.mshiper1.model.User;

import java.util.List;

public class App extends Application {

    private double lat;
    private double lon;
    private List<Order> orders;

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override public void onCreate() {
        super.onCreate();
    }
    public static Boolean isInDebugMode() {
        return false;
    }
}
