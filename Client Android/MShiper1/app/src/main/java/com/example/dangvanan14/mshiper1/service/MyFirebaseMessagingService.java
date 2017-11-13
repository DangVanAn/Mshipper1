package com.example.dangvanan14.mshiper1.service;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.BitmapFactory;
import android.media.RingtoneManager;
import android.net.Uri;
import android.support.v7.app.NotificationCompat;
import android.util.Log;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.MainActivity;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.model.User;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.google.gson.Gson;

/**
 * Created by LAP10186-local on 8/27/2017.
 */

public class MyFirebaseMessagingService extends FirebaseMessagingService {
    private static final String TAG = "FirebaseMessaging";
    private int NOTIFICATION_ID = 0;
    private int NOTIFICATION_CODE = 0;

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        User user = getUser();

        if (user == null) {
            return;
        }
        Log.d(TAG, "showNotification: " + user.get_permission_id());

        if (remoteMessage.getData() != null && remoteMessage.getData().get("toTypeUser") != null
                && remoteMessage.getData().get("toTypeUser").equals(user.get_permission_id())) {
            Log.d(TAG, "showNotification: ");
            String notiId = remoteMessage.getData().get("NOTIFICATION_ID");
            String notiCode = remoteMessage.getData().get("NOTIFICATION_CODE");
            String typeBroadCast = remoteMessage.getData().get("TYPE_BROADCAST");
            try {
                if (typeBroadCast == null) {
                    return;
                }
                if (notiId != null) {
                    NOTIFICATION_ID = Integer.parseInt(notiId);
                }
                if (notiCode != null) {
                    NOTIFICATION_CODE = Integer.parseInt(notiCode);
                }

                showNotification(remoteMessage.getData().get("title"), remoteMessage.getData().get("content"));
                sendBroadcast(typeBroadCast);
            } catch (Exception e) {
                e.printStackTrace();
                Log.e(TAG, "onMessageReceived: " + e.getMessage());
            }
        }
    }

    User getUser() {
        SharedPreferences prefs = getSharedPreferences(DefinedApp.SharedPreferencesKey, Context.MODE_PRIVATE);
        String userStr = prefs.getString(DefinedApp.UserShaPreKey, "");
        if (userStr.equals("")) {
            return null;
        }
        Gson gson = new Gson();
        return gson.fromJson(userStr, User.class);
    }

    public void showNotification(String title, String content) {
        Intent intentMain = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, NOTIFICATION_CODE,
                intentMain, PendingIntent.FLAG_UPDATE_CURRENT);
        Uri sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

        NotificationCompat.Builder notBuilder = new NotificationCompat.Builder(this);
        notBuilder.setAutoCancel(true);
        notBuilder.setTicker("This is a ticker");
//        this.notBuilder.setWhen(System.currentTimeMillis()+ 10* 1000);
        notBuilder.setContentTitle(title);
        notBuilder.setContentText(content);
        notBuilder.setContentIntent(pendingIntent);
        notBuilder.setSound(sound);
        notBuilder.setSmallIcon(R.mipmap.ic_launcher);
        notBuilder.setLargeIcon(BitmapFactory.decodeResource(this.getResources(), R.mipmap.ic_launcher));

        NotificationManager notificationService =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        Notification notification = notBuilder.build();
        if (notificationService != null) {
            notificationService.notify(NOTIFICATION_ID, notification);
        }
    }

    private void sendBroadcast(String nameBroadcast) {
        if (nameBroadcast.equals("BROADCAST_REFRESH_STATE_VEHICLE")) {
            Intent intent = new Intent(DefinedApp.BROADCAST_REFRESH_STATE_VEHICLE);
            sendBroadcast(intent);
        }
    }
}
