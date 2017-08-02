package com.example.dangvanan14.mshiper1.application;

import android.app.Application;

import com.example.dangvanan14.mshiper1.model.Order;
import com.example.dangvanan14.mshiper1.model.User;

import java.util.List;

public class App extends Application {

    double lat;
    double lon;
    List<Order> orders;

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

    public static User user = new User();
    @Override public void onCreate() {
        user.set_email("dmh@gmail.com");
        super.onCreate();
    }

    public static Boolean isInDebugMode() {
        return false;
    }
}
