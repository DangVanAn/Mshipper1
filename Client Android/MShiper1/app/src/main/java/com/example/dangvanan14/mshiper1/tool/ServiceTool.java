package com.example.dangvanan14.mshiper1.tool;

import android.app.ActivityManager;
import android.content.Context;
import android.util.Log;

/**
 * Created by LAP10186-local on 11/4/2017.
 */

public class ServiceTool {
    public static boolean isServiceRunning(Class<?> serviceClass, Context context) {
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                Log.i("Service already", "running");
                return true;
            }
        }
        Log.i("Service not", "running");
        return false;
    }
}
