package com.example.dangvanan14.mshiper1.application;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.support.multidex.MultiDex;

import com.example.dangvanan14.mshiper1.model.Order;
import com.example.dangvanan14.mshiper1.model.User;
import com.google.gson.Gson;

import java.util.List;

import io.realm.Realm;
import io.realm.RealmConfiguration;

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

    private static User user;

    public static User getUser() {
        return user;
    }

    public static void setUser(User user) {
        App.user = user;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Realm.init(this);
        RealmConfiguration config = new RealmConfiguration.Builder().name("myrealm.realm").build();
        Realm.setDefaultConfiguration(config);
        if (user == null) {
            getUserLocal();
        }
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    public static Boolean isInDebugMode() {
        return false;
    }

    public void getUserLocal() {
        SharedPreferences prefs = getSharedPreferences(DefinedApp.SharedPreferencesKey, Context.MODE_PRIVATE);
        String userStr = prefs.getString(DefinedApp.UserShaPreKey, "");
        if (userStr.equals("")) {
            user = null;
        }
        Gson gson = new Gson();
        User user = gson.fromJson(userStr, User.class);
        App.user = user;
    }
}
