package com.example.dangvanan14.mshiper1.notification;

/**
 * Created by dangvanan14 on 5/20/2017.
 */

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.LocalBroadcastManager;

import com.example.dangvanan14.mshiper1.NotificationTest;
import com.example.dangvanan14.mshiper1.R;
import com.google.android.gms.gcm.GcmListenerService;

public class GCMService extends GcmListenerService {

    @Override
    public void onMessageReceived(String from, Bundle data) {
        String message = data.getString("message");
        Intent intent = new Intent(NotificationTest.MESSAGE_RECEIVED);
        intent.putExtra("message",message);
        LocalBroadcastManager.getInstance(GCMService.this).sendBroadcast(intent);
        sendNotification(message);
    }

    private void sendNotification(String message) {

        Intent intent = new Intent(this, NotificationTest.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        intent.setAction(NotificationTest.MESSAGE_RECEIVED);
        intent.putExtra("message",message);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT);

        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.message)
                .setContentTitle("GCM Message Received")
                .setContentText(message)
                .setAutoCancel(true)
                .setSound(defaultSoundUri)
                .setContentIntent(pendingIntent);

        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        notificationManager.notify(0, notificationBuilder.build());
    }
}