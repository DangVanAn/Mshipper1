package com.example.dangvanan14.mshiper1.service;

import android.Manifest;
import android.app.Activity;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.content.WakefulBroadcastReceiver;
import android.util.Log;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.fragment.TripDetailStepFragment;
import com.example.dangvanan14.mshiper1.model.AssignDriver;
import com.example.dangvanan14.mshiper1.model.LocationCustom;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
import com.example.dangvanan14.mshiper1.model.Trip;
import com.example.dangvanan14.mshiper1.response.RepPost;
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

import org.slf4j.Logger;

import java.lang.reflect.Type;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;

public class TrackingService extends Service implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, LocationListener {
    private static final String TAG = "TrackingService";
    private String lat, lon;
    private GoogleApiClient mGoogleApiClient;

    private Socket mSocket;
    private List<List<Boundary.Point>> polygonWarehouse = new ArrayList<>();
    private List<List<Boundary.Point>> polygonDelivery = new ArrayList<>();

    private List<PreOrderSumAssign> preOrderSumAssignList = new ArrayList<>();
    private Trip trip;
    private Intent intentBroadCast;
    private DefinedApp.StateLocation stateVehicle = DefinedApp.StateLocation.NOTHING;
    private List<String> ids;
    private WakefulBroadcastReceiver receiver;

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
        trip = intent.getParcelableExtra("trip");
        ids = intent.getStringArrayListExtra("ids");
        if (trip == null || ids == null)
            return START_STICKY;

        List<AssignDriver> assignDrivers = trip.getData();
        for (int i = 0; i < assignDrivers.size(); i++) {
            preOrderSumAssignList.add(assignDrivers.get(i).get_pre_order_sum_assign().get(0));
        }

        Gson gson = new Gson();
        if (preOrderSumAssignList.size() > 0) {
            for (int i = 0; i < preOrderSumAssignList.size(); i++) {
                Type listType = new TypeToken<List<double[]>>() {
                }.getType();
                PreOrderSumAssign preOrderSumAssign = preOrderSumAssignList.get(i);
                List<double[]> arrWarehouse = gson.fromJson(preOrderSumAssign.get_pre_order_sum().get(0).get_polygon_warehouse(), listType);
                List<double[]> arrDelivery = gson.fromJson(preOrderSumAssign.get_pre_order_sum().get(0).get_polygon_delivery(), listType);

                List<Boundary.Point> polygonWarehouseTemp = new ArrayList<>();
                List<Boundary.Point> polygonDeliveryTemp = new ArrayList<>();

                for (double[] j : arrWarehouse) {
                    polygonWarehouseTemp.add(new Boundary.Point(j[0], j[1]));
                }
                for (double[] j : arrDelivery) {
                    polygonDeliveryTemp.add(new Boundary.Point(j[0], j[1]));
                }

                polygonDelivery.add(polygonDeliveryTemp);
                polygonWarehouse.add(polygonWarehouseTemp);
            }
        }
        mSocket.connect();
        buildGoogleApiClient();

        mGoogleApiClient.connect();

        IntentFilter filter = new IntentFilter(DefinedApp.BROADCAST_REMOVE_ID_PREORDERSUMASSIGN);
        receiver = new WakefulBroadcastReceiver() {
            public void onReceive(Context arg0, Intent arg1) {
                String id = arg1.getStringExtra("id_pre_order_sum_assign");
                Log.d(TAG, "onReceive: có nhận dc nha " + id);
                ids.remove(id);
                if (ids.size() == 0) {
                    arg0.stopService(intent);
                }
            }
        };
        registerReceiver(receiver, filter);
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

        checkStateLocation(location);
        if (preOrderSumAssignList.size() > 0){
            LocationCustom data = new LocationCustom(location.getLatitude(), location.getLongitude(), System.currentTimeMillis(), App.getUser().get_id(), ids, preOrderSumAssignList.get(0).get_number_plate(), preOrderSumAssignList.get(0).get_trip());
            Gson gson = new Gson();
            mSocket.emit("messages", gson.toJson(data));
        }
    }

    public void checkStateLocation(Location location) {
        Boundary.Point gps = new Boundary.Point(location.getLatitude(), location.getLongitude());
        if (preOrderSumAssignList != null && (polygonDelivery != null && polygonDelivery.size() > 0)
                && (polygonWarehouse != null && polygonWarehouse.size() > 0)) {
            for (int i = 0; i < preOrderSumAssignList.size(); i++) {
                PreOrderSumAssign preOrderSumAssign = preOrderSumAssignList.get(i);

                Boundary boundaryDelivery = new Boundary(polygonDelivery.get(i));
                Boundary boundaryWareHouse = new Boundary(polygonWarehouse.get(i));
                intentBroadCast.putExtra("Latitude", location.getLatitude());
                intentBroadCast.putExtra("Longitude", location.getLongitude());
                intentBroadCast.putExtra("trip", trip);
                long timeNow = (new Date()).getTime();

                if (boundaryDelivery.contains(gps)) {
                    if (stateVehicle != DefinedApp.StateLocation.DELIVERY) {
                        intentBroadCast.putExtra("type", DefinedApp.StateLocation.DELIVERY);
                        intentBroadCast.putExtra("idPlace", preOrderSumAssign.get_pre_order_sum().get(0).get_id_delivery());
                        stateVehicle = DefinedApp.StateLocation.DELIVERY;
                        sendBroadcast(intentBroadCast);
                        postUpdateTimeAuto(ids, "_in_warehouse_auto", timeNow);
                    }
                } else if (boundaryWareHouse.contains(gps)) {
                    if (stateVehicle != DefinedApp.StateLocation.WAREHOUSE) {
                        intentBroadCast.putExtra("type", DefinedApp.StateLocation.WAREHOUSE);
                        intentBroadCast.putExtra("idPlace", preOrderSumAssign.get_pre_order_sum().get(0).get_id_warehouse());
                        stateVehicle = DefinedApp.StateLocation.WAREHOUSE;
                        sendBroadcast(intentBroadCast);
                        postUpdateTimeAuto(ids, "_in_delivery_auto", timeNow);
                    }
                }
            }
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy: Tao đã hủy");
        mGoogleApiClient.disconnect();

        mSocket.disconnect();
        mSocket.off("messages", onNewMessage);
        if (receiver != null) {
            unregisterReceiver(receiver);
        }
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

    public void postUpdateTimeAuto(List<String> id, final String element, final long valueTime) {
        final LoadData<RepPost> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                TripDetailStepFragment.ParamUpdateStep pram = new TripDetailStepFragment.ParamUpdateStep();
                pram._pre_order_sum_assign = id;
                pram.element = element;
                pram.time = valueTime;
                return loadData.CreateRetrofit().postUpdateTimeStep(pram);
            }
        }, new LoadData.CallbackDelegate<>(new CallbackPostUpdateTimeStep()));
    }

    private static class CallbackPostUpdateTimeStep extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(Fragment fragment, RepPost body, Logger LOG) {
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());
            }
        }

        @Override
        public void onFailure(Activity activity, Throwable t, Logger LOG) {
            Log.e("TAG", "onFailure: " + t.getMessage());
            Toast.makeText(activity, "Có lỗi xảy ra!", Toast.LENGTH_SHORT).show();
        }
    }
}
