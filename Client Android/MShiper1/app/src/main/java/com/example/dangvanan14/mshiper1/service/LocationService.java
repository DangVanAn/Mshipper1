package com.example.dangvanan14.mshiper1.service;

import android.Manifest;
import android.app.Activity;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.IBinder;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.response.RepPost;

import org.slf4j.Logger;

import java.util.concurrent.Callable;

import retrofit2.Call;


public class LocationService extends Service {
    public static final String BROADCAST_ACTION = "SEND_GPS";
    private static final int TWO_MINUTES = 1000 * 60 * 2;
    public LocationManager locationManager;
    public MyLocationListener listener;
    public Location previousBestLocation = null;
    String idUser = "HƯNG";
    Intent intent;
    int counter = 0;
    public LoadData<RepPost> loadData;

    @Override
    public void onCreate() {
        super.onCreate();
        intent = new Intent(BROADCAST_ACTION);
        loadData = new LoadData<>();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("START_SERVICE", "DONE");
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        listener = new MyLocationListener();
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            super.onStartCommand(intent, flags, startId);
        }

        locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 10000, 10, listener);
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10000, 10, listener);
        return super.onStartCommand(intent, flags, startId);
    }

    protected boolean isBetterLocation(Location location, Location currentBestLocation) {
        if (currentBestLocation == null) {
            return true;
        }

        long timeDelta = location.getTime() - currentBestLocation.getTime();
        boolean isSignificantlyNewer = timeDelta > TWO_MINUTES;
        boolean isSignificantlyOlder = timeDelta < -TWO_MINUTES;
        boolean isNewer = timeDelta > 0;

        if (isSignificantlyNewer) {
            return true;
        } else if (isSignificantlyOlder) {
            return false;
        }

        int accuracyDelta = (int) (location.getAccuracy() - currentBestLocation.getAccuracy());
        boolean isLessAccurate = accuracyDelta > 0;
        boolean isMoreAccurate = accuracyDelta < 0;
        boolean isSignificantlyLessAccurate = accuracyDelta > 200;

        boolean isFromSameProvider = isSameProvider(location.getProvider(),
                currentBestLocation.getProvider());

        if (isMoreAccurate) {
            return true;
        } else if (isNewer && !isLessAccurate) {
            return true;
        } else if (isNewer && !isSignificantlyLessAccurate && isFromSameProvider) {
            return true;
        }
        return false;
    }

    private boolean isSameProvider(String provider1, String provider2) {
        if (provider1 == null) {
            return provider2 == null;
        }
        return provider1.equals(provider2);
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.v("STOP_SERVICE", "DONE");
        locationManager.removeUpdates(listener);
    }

    class MyLocationListener implements LocationListener {
        public void onLocationChanged(final Location loc) {
            Log.i("***************", "Location changed");
            if (isBetterLocation(loc, previousBestLocation)) {
                previousBestLocation = loc;
                loc.getLatitude();
                loc.getLongitude();
                intent.putExtra("Latitude", loc.getLatitude());
                intent.putExtra("Longitude", loc.getLongitude());
                intent.putExtra("Provider", loc.getProvider());
                loadData.loadData(new Callable<Call<RepPost>>() {
                    @Override
                    public Call<RepPost> call() throws Exception {
                        return loadData.CreateRetrofit().postLocation(new com.example.dangvanan14.mshiper1.model.Location("" + loc.getLatitude(), "" + loc.getLongitude(), "" + System.currentTimeMillis(), idUser));
                    }
                }, new LoadData.CallbackDelegate<RepPost>(new CallBackImpl()));
                sendBroadcast(intent);
            }
        }

        public class CallBackImpl implements ICallbackApi<RepPost> {
            @Override
            public void onResponse(Fragment fragment, RepPost body, Logger LOG) {

            }

            @Override
            public void onResponse(Activity activity, RepPost body, Logger LOG) {

            }

            @Override
            public void onResponse(RepPost body, Logger log) {
                Log.d("TAG", "onResponse: " + body.getRep());
            }

            @Override
            public void onFailure(Throwable t, Logger LOG) {
                Log.e("TAG", "onFailure: Sai rồi nè");
            }
        }

        public void onProviderDisabled(String provider) {
            Toast.makeText(getApplicationContext(), "Gps Disabled", Toast.LENGTH_SHORT).show();
        }

        public void onProviderEnabled(String provider) {
            Toast.makeText(getApplicationContext(), "Gps Enabled", Toast.LENGTH_SHORT).show();
        }

        public void onStatusChanged(String provider, int status, Bundle extras) {
        }
    }
}