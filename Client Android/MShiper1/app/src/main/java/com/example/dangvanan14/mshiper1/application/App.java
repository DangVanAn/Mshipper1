package com.example.dangvanan14.mshiper1.application;

import android.app.Application;

import com.example.dangvanan14.mshiper1.model.User;

public class App extends Application {
    public static User user = new User();
    @Override public void onCreate() {
        user.set_email("dmh@gmail.com");
        super.onCreate();
    }

    public static Boolean isInDebugMode() {
        return false;
    }
}
