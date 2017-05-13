package com.example.dangvanan14.mshiper1.application;

import android.app.Application;

public class App extends Application {

    @Override public void onCreate() {
        super.onCreate();
    }

    public static Boolean isInDebugMode() {
        return false;
    }
}
