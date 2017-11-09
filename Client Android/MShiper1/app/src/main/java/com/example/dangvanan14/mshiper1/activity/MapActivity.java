package com.example.dangvanan14.mshiper1.activity;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.View;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.customview.MapWrapperLayout;
import com.example.dangvanan14.mshiper1.model.LocationCustom;
import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.gson.Gson;
import com.google.maps.android.ui.IconGenerator;

import java.net.URISyntaxException;

public class MapActivity extends FragmentActivity
        implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, LocationListener, OnMapReadyCallback {

    private GoogleMap mMap;

    private GoogleApiClient mGoogleApiClient;

    Marker markerLocation;
    private String lat, lon;

    private Emitter.Listener onNewMessage = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
//            JSONObject data = (JSONObject) args[0];
//            String username;
//            String message;
//            try {
//                username = data.getString("username");
//                message = data.getString("message");
//            } catch (JSONException e) {
//                return;
//            }
            String username = (String) args[0];
            Log.d("TAG", "run: " + username + "   ");
        }
    };
    private Socket mSocket;
    {
        try {
            mSocket = IO.socket(DefinedApp.URL_SOCKET_GPS);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);

        mSocket.on("messages", onNewMessage);
        mSocket.on("chat", onNewMessage);
        mSocket.connect();

        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        // Getting a reference to the map
        IconGenerator mIconGenerator = new IconGenerator(getApplicationContext());
        mIconGenerator.setStyle(IconGenerator.STYLE_GREEN);
        MapWrapperLayout mapWrapperLayout = (MapWrapperLayout) findViewById(R.id.map_reLative_Layout);

        // Init List of marker
        FloatingActionButton btnMyLocation = (FloatingActionButton) findViewById(R.id.btnLocation);

        // MapWrapperLayout initialization
        // 39 - default marker height
        // 20 - offset between the default InfoWindow bottom edge and it's content bottom edge
        mapWrapperLayout.init(mMap, getPixelsFromDp(this, 39 + 20));

        btnMyLocation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (lat != null && lon != null) {
                    if (markerLocation != null)
                        markerLocation.remove();

                    LatLng latLng = new LatLng(Double.parseDouble(lat), Double.parseDouble(lon));
                    markerLocation = mMap.addMarker(new MarkerOptions()
                            .position(latLng)
                            .title("Bạn đang ở đây!"));
                    CameraUpdate cameraUpdate = CameraUpdateFactory.newLatLngZoom(latLng, 16.0f);
                    mMap.animateCamera(cameraUpdate);
                }
            }
        });
        buildGoogleApiClient();
    }

//    @Override
//    public void onBackPressed() {
//
//        if(mViewGroup_RL_Find_Place.isShown())
//            mViewGroup_RL_Find_Place.setVisibility(View.GONE);
//        else
//        {
//            if(mViewGroup_RL_Des.isShown())
//                mViewGroup_RL_Des.setVisibility(View.GONE);
//            else
//            {
//                DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
//                if (drawer.isDrawerOpen(GravityCompat.START)) {
//                    drawer.closeDrawer(GravityCompat.START);
//                } else {
//                    super.onBackPressed();
//                }
//            }
//        }
//    }

    /////LOcation update -----------------------------------------////
//    @Override
//    public void onConnected(Bundle bundle) {
//
//        mLocationRequest = LocationRequest.create();
//        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
//        mLocationRequest.setInterval(100); // Update location every second
//
//        if (ActivityCompat.checkSelfPermission(this,
//                Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
//                && ActivityCompat.checkSelfPermission(this,
//                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
//            // TODO: Consider calling
//            //    ActivityCompat#requestPermissions
//            // here to request the missing permissions, and then overriding
//            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
//            //                                          int[] grantResults)
//            // to handle the case where the user grants the permission. See the documentation
//            // for ActivityCompat#requestPermissions for more details.
//            return;
//        }
//        LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient, mLocationRequest, this);
//        mLastLocation = LocationServices.FusedLocationApi.getLastLocation(
//                mGoogleApiClient);
//        if (mLastLocation != null) {
//            lat = String.valueOf(mLastLocation.getLatitude());
//            lon = String.valueOf(mLastLocation.getLongitude());
//        }
////        updateUI();
//    }

//    @Override
//    public void onConnectionSuspended(int i) {}

//    @Override
//    public void onLocationChanged(LocationCustom location) {
//        lat = String.valueOf(location.getLatitude());
//        lon = String.valueOf(location.getLongitude());
//
//        latitude = Double.parseDouble(String.valueOf(location.getLatitude()));
//        longitude = Double.parseDouble(String.valueOf(location.getLongitude()));
//        updateUI();
//    }
//        void updateUI() {
//            if(lat != null && lon != null)
//            {
//                if(markerLocation != null)
//                    markerLocation.remove();
//                LatLng latLng = new LatLng(Double.parseDouble(lat), Double.parseDouble(lon));
//                markerLocation = mMap.addMarker(new MarkerOptions()
//                        .icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_loc))
//                        .position(latLng)
//                        .title("Bạn đang ở đây!"));
//            }
//    }

//    @Override
//    public void onConnectionFailed(ConnectionResult connectionResult) {
//        buildGoogleApiClient();
//    }
//    synchronized void buildGoogleApiClient() {
//        mGoogleApiClient = new GoogleApiClient.Builder(this)
//                .addConnectionCallbacks(this)
//                .addOnConnectionFailedListener(this)
//                .addApi(LocationServices.API)
//                .build();
//    }

//    public void getLocationFromAddress(String strAddress){
//
//        Geocoder coder = new Geocoder(this);
//        List<Address> address;
//        try {
//            address = coder.getFromLocationName(strAddress,1);
//            if (address==null) {
//                return;
//            }
//            Address location=address.get(0);
//            search_loc =new LatLng((location.getLatitude()),(location.getLongitude()));
//            marker_Find = mMap.addMarker(new MarkerOptions()
//                    .icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_loc))
//                    .title(strAddress)
//                    .position(search_loc));
//            mysearch.add(marker_Find);
//            //mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(search_loc, 13));
//            CameraUpdate cameraUpdate = CameraUpdateFactory.newLatLngZoom(search_loc, 16.0f);
//            mMap.animateCamera(cameraUpdate);
//
//        }catch (IOException e) {
//            // TODO Auto-generated catch block
//        }
//    }

//    @Override
//    public void onMapReady(GoogleMap googleMap) {
//        mMap = googleMap;
//        LatLng hcmus = new LatLng(10.762963, 106.682394);
//        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(hcmus, 3));
//
//        Intent in = getIntent();
//        String diachi = in.getStringExtra("AddressHistory");
//        if(diachi!= null)
//        {
//            EditText Input_edit = (EditText) findViewById(R.id.editText_Search);
//            Input_edit.setText(diachi);
//            getLocationFromAddress(diachi);
//        }
//    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////



    public static int getPixelsFromDp(Context context, float dp) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int)(dp * scale + 0.5f);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        LatLng hcmus = new LatLng(10.762963, 106.682394);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(hcmus, 8));

        if (ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
        }
        mMap.setMyLocationEnabled(true);
        mMap.getUiSettings().setMyLocationButtonEnabled(false);
    }

    int i = 0;
    Gson gson = new Gson();
    @Override
    public void onLocationChanged(Location location) {
        lat = String.valueOf(location.getLatitude());
        lon = String.valueOf(location.getLongitude());
        Log.d("TAG", "onLocationChanged: " + lat + "  +  " + lon);

        LocationCustom data = new LocationCustom(location.getLatitude(), location.getLongitude(), System.currentTimeMillis(), ((App) getApplication()).getUser().get_phone(), null, "", "");

//        mSocket.emit("messages", gson.toJson(data));
        if (mMap != null) updateUI();
    }
    void updateUI() {
        if (lat != null && lon != null) {
            if (markerLocation != null)
                markerLocation.remove();
            LatLng latLng = new LatLng(Double.parseDouble(lat), Double.parseDouble(lon));
            markerLocation = mMap.addMarker(new MarkerOptions()
                    .icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_one_pixel))
                    .position(latLng)
                    .title("Bạn đang ở đây!"));
        }
    }
    @Override
    public void onConnected(Bundle bundle) {

        LocationRequest mLocationRequest = LocationRequest.create();
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        mLocationRequest.setInterval(10000); // Update location every second

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
    public void onConnectionSuspended(int i) {}

    @Override
    public void onConnectionFailed(ConnectionResult connectionResult) {
        buildGoogleApiClient();
    }

    synchronized void buildGoogleApiClient() {
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API)
                .build();
    }

    @Override
    protected void onStart() {
        super.onStart();
        mGoogleApiClient.connect();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mGoogleApiClient.disconnect();

        mSocket.disconnect();
        mSocket.off("messages", onNewMessage);
    }

    @Override
    protected void onStop()
    {
        super.onStop();

    }
}
