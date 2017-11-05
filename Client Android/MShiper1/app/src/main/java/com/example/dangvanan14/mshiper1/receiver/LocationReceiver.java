package com.example.dangvanan14.mshiper1.receiver;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.support.v4.content.WakefulBroadcastReceiver;
import android.support.v7.app.NotificationCompat;
import android.util.Log;

import com.example.dangvanan14.mshiper1.activity.AssignDriverDetailActivity;
import com.example.dangvanan14.mshiper1.activity.MainActivity;
import com.example.dangvanan14.mshiper1.model.AssignDriver;

/**
 * Created by LAP10186-local on 11/4/2017.
 */

public class LocationReceiver extends WakefulBroadcastReceiver {
    private static final String TAG = "LocationReceiver";
    private static final int MY_NOTIFICATION_ID = 12345;
    private static final int MY_REQUEST_CODE = 100;

    @Override
    public void onReceive(Context context, Intent intent) {
        double lat = intent.getDoubleExtra("Latitude", 0);
        double lon = intent.getDoubleExtra("Longitude", 0);
        AssignDriver assignDriver = intent.getParcelableExtra("assignDriver");
        int type = intent.getIntExtra("type", 0);
        Log.d(TAG, "onReceive: " + lat + " " + lon + " type" + type);
        if (type == 1 || type == 2) {
            showNotification(context, intent, lat, lon, assignDriver);
        }
    }

    public void showNotification(Context context, Intent intent, double lat, double lon, AssignDriver assignDriver) {
        String text = "Đã vào kho ..." + lat + " " + lon;
        Intent intentMain = new Intent(context, AssignDriverDetailActivity.class);
        intentMain.putExtra("assignDetail", assignDriver);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, MY_REQUEST_CODE,
                intentMain, PendingIntent.FLAG_UPDATE_CURRENT);
        Uri sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);


        NotificationCompat.Builder notBuilder = new NotificationCompat.Builder(context);
        notBuilder.setAutoCancel(true);
        notBuilder.setTicker("This is a ticker");
//        this.notBuilder.setWhen(System.currentTimeMillis()+ 10* 1000);
        notBuilder.setContentTitle("Thông báo xác nhận");
        notBuilder.setContentText(text);
        notBuilder.setContentIntent(pendingIntent);
        notBuilder.setSound(sound);
        notBuilder.setSmallIcon(android.R.drawable.ic_dialog_alert);

        NotificationManager notificationService =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        Notification notification = notBuilder.build();
        if (notificationService != null) {
            notificationService.notify(MY_NOTIFICATION_ID, notification);
        }
    }
}
