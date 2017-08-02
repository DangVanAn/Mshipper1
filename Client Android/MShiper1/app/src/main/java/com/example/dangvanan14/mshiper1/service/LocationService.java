package com.example.dangvanan14.mshiper1.service;

import android.Manifest;
import android.app.Activity;
import android.app.Service;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.IBinder;
import android.os.PowerManager;
import android.provider.Settings;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.response.RepPost;

import org.slf4j.Logger;

import java.util.concurrent.Callable;

import retrofit2.Call;


public class LocationService extends Service {
    public static final String BROADCAST_ACTION = "SEND_GPS";
    private static final int TWO_MINUTES = 1000 * 60 * 2;
    private static final long MIN_TIME_BW_UPDATES = 2000;
    private static final float MIN_DISTANCE_CHANGE_FOR_UPDATES = 0;
    public LocationManager locationManager;
    public MyLocationListener listener;
    public Location previousBestLocation = null;
    Intent intent;
    int counter = 0;
    public LoadData<RepPost> loadData;
    private Location locationNetwork;
    private Location locationGPS;
    private double latitude;
    private double longitude;

    @Override
    public void onCreate() {
        super.onCreate();
        intent = new Intent(BROADCAST_ACTION);
        loadData = new LoadData<>();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("START_SERVICE", "DONE");
        PowerManager mgr = (PowerManager) getSystemService(Context.POWER_SERVICE);
        wakeLock = mgr.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "MyWakeLock");
        wakeLock.acquire();

        startLocation(getApplicationContext());
        Thread thread = new Thread() {
            @Override
            public void run() {
                int i = 0;
                try {
                    while (true) {
                        sleep(1000);
                        Log.d("***************", "run: " + i++);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        thread.start();
        return super.onStartCommand(intent, flags, startId);
    }

    private PowerManager.WakeLock wakeLock;

    public void startLocation(Context context) {

        locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        listener = new MyLocationListener();

        boolean gps_enabled = false;
        boolean network_enabled = false;

        try {
            gps_enabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
            network_enabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

            if (!gps_enabled && !network_enabled) {
                AlertDialog.Builder dialog = new AlertDialog.Builder(getApplicationContext());
                dialog.setMessage(getResources().getString(R.string.gps_network_not_enabled));
                dialog.setPositiveButton(getResources().getString(R.string.open_location_settings), new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface paramDialogInterface, int paramInt) {
                        Intent myIntent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                        startActivity(myIntent);
                    }
                });
                dialog.setNegativeButton(getString(R.string.Cancel), (paramDialogInterface, paramInt) -> {
                });
                dialog.show();
            } else {
                if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    return;
                }
                locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER,
                        MIN_TIME_BW_UPDATES,
                        MIN_DISTANCE_CHANGE_FOR_UPDATES, listener);

                locationManager.requestLocationUpdates(
                        LocationManager.GPS_PROVIDER,
                        MIN_TIME_BW_UPDATES,
                        MIN_DISTANCE_CHANGE_FOR_UPDATES, listener);

                if (locationManager != null) {
                    locationNetwork = locationManager
                            .getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                    if (locationNetwork != null) {
                        latitude = locationNetwork.getLatitude();
                        longitude = locationNetwork.getLongitude();
                    }

                    locationGPS = locationManager
                            .getLastKnownLocation(LocationManager.GPS_PROVIDER);
                    if (locationGPS != null) {
                        latitude = locationGPS.getLatitude();
                        longitude = locationGPS.getLongitude();
                    }
                }
            }
        } catch (Exception ex) {
            Log.d("TAG", "startLocation: " + ex.getMessage());
        }
    }

    public double getLatitude() {
        if (locationGPS != null) {
            latitude = locationNetwork.getLatitude();
        } else if (locationNetwork != null) {
            latitude = locationGPS.getLatitude();
        }
        return latitude;
    }

    public double getLongitude() {
        if (locationGPS != null) {
            latitude = locationNetwork.getLongitude();
        } else if (locationNetwork != null) {
            latitude = locationGPS.getLongitude();
        }
        return longitude;
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

    public void stopUsingGPS() {
        if (locationManager != null) {
            locationManager.removeUpdates(listener);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.v("STOP_SERVICE", "DONE");
        if (locationManager != null) {
            locationManager.removeUpdates(listener);
            wakeLock.release();
        }
    }

    public class MyLocationListener implements LocationListener {
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
                        return loadData.CreateRetrofit().postLocation(new com.example.dangvanan14.mshiper1.model.Location(loc.getLatitude(), loc.getLongitude(), System.currentTimeMillis(), App.user.get_email()));
                    }
                }, new LoadData.CallbackDelegate<RepPost>(new CallBackImpl()));
                ((App) getApplication()).setLat(loc.getLatitude());
                ((App) getApplication()).setLon(loc.getLongitude());

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
                Log.d("TAG", "onResponse: " + body.getMessage());
            }

            @Override
            public void onFailure(Fragment fragment, Throwable t, Logger LOG) {

            }

            @Override
            public void onFailure(Activity activity, Throwable t, Logger LOG) {

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

