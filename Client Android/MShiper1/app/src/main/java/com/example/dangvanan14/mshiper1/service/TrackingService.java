package com.example.dangvanan14.mshiper1.service;

import android.Manifest;
import android.app.Service;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.util.Log;

import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.model.AssignDriver;
import com.example.dangvanan14.mshiper1.model.LocationCustom;
import com.example.dangvanan14.mshiper1.model.PreOrderSum;
import com.example.dangvanan14.mshiper1.tool.Boundary;
import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

public class TrackingService extends Service implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, LocationListener {
    public static final int VEHICLE_IN_DELIVERY = 1;
    public static final int VEHICLE_IN_WAREHOUSE = 2;

    private String lat, lon;
    private GoogleApiClient mGoogleApiClient;

    private Socket mSocket;
    private List<Boundary.Point> polygonWarehouse = new ArrayList<>();
    private List<Boundary.Point> polygonDelivery = new ArrayList<>();

    private PreOrderSum preOrderSum;
    private AssignDriver assignDriver;
    private Intent intentBroadCast;
    private int stateVehicle = 0;

    {
        try {
            mSocket = IO.socket(DefinedApp.URL_SOCKET_GPS);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    private Emitter.Listener onNewMessage = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            String username = (String) args[0];
            Log.d("TAG", "run: " + username + "   ");
        }
    };

    @Override
    public void onCreate() {
        super.onCreate();
        intentBroadCast = new Intent(DefinedApp.BROADCAST_LOCATION);
        mSocket.on("messages", onNewMessage);
        mSocket.on("chat", onNewMessage);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        assignDriver = intent.getParcelableExtra("assignDriver");
        preOrderSum = assignDriver.get_pre_order_sum_assign().get(0).get_pre_order_sum().get(0);

        Gson gson = new Gson();
        if (preOrderSum != null) {
            Type listType = new TypeToken<List<double[]>>() {
            }.getType();

            List<double[]> arrWarehouse = gson.fromJson(preOrderSum.get_polygon_warehouse(), listType);
            List<double[]> arrDelivery = gson.fromJson(preOrderSum.get_polygon_delivery(), listType);

            for (double[] i : arrWarehouse) {
                polygonWarehouse.add(new Boundary.Point(i[0], i[1]));
            }
            for (double[] i : arrDelivery) {
                polygonDelivery.add(new Boundary.Point(i[0], i[1]));
            }
        }
        mSocket.connect();
        buildGoogleApiClient();

        mGoogleApiClient.connect();
        return START_STICKY;
    }

    @Override
    public void onConnected(Bundle bundle) {
        LocationRequest mLocationRequest = LocationRequest.create();
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        mLocationRequest.setInterval(1000); // Update location every second

        if (ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient, mLocationRequest, this);
        Location mLastLocation = LocationServices.FusedLocationApi.getLastLocation(
                mGoogleApiClient);
        if (mLastLocation != null) {
            lat = String.valueOf(mLastLocation.getLatitude());
            lon = String.valueOf(mLastLocation.getLongitude());
        }
    }

    @Override
    public void onConnectionSuspended(int i) {
    }

    synchronized void buildGoogleApiClient() {
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API)
                .build();
    }


    public void onLocationChanged(Location location) {
        lat = String.valueOf(location.getLatitude());
        lon = String.valueOf(location.getLongitude());
        Log.d("TAG", "onLocationChanged: " + lat + "  +  " + lon);
        Boundary.Point gps = new Boundary.Point(location.getLatitude(), location.getLongitude());

        if (preOrderSum != null && polygonDelivery.size() != 0 && polygonWarehouse.size() != 0) {
            Boundary boundaryDelivery = new Boundary(polygonDelivery);
            Boundary boundaryWareHouse = new Boundary(polygonWarehouse);
            intentBroadCast.putExtra("Latitude", location.getLatitude());
            intentBroadCast.putExtra("Longitude", location.getLongitude());
            intentBroadCast.putExtra("assignDriver", assignDriver);

            if (boundaryDelivery.contains(gps)) {
                if (stateVehicle != VEHICLE_IN_DELIVERY){
                    intentBroadCast.putExtra("type", VEHICLE_IN_DELIVERY);
                    stateVehicle = VEHICLE_IN_DELIVERY;
                    sendBroadcast(intentBroadCast);
                }
            } else if (boundaryWareHouse.contains(gps)) {
                if (stateVehicle != VEHICLE_IN_WAREHOUSE){
                    intentBroadCast.putExtra("type", VEHICLE_IN_WAREHOUSE);
                    stateVehicle = VEHICLE_IN_WAREHOUSE;
                    sendBroadcast(intentBroadCast);
                }
            }
        }

        LocationCustom data = new LocationCustom(location.getLatitude(), location.getLongitude(), System.currentTimeMillis(), App.getUser().get_phone());
        Gson gson = new Gson();
//        mSocket.emit("messages", gson.toJson(data));
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mGoogleApiClient.disconnect();

        mSocket.disconnect();
        mSocket.off("messages", onNewMessage);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
        buildGoogleApiClient();
    }
}
