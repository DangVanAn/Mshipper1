package com.example.dangvanan14.mshiper1.fragment;

import android.Manifest;
import android.app.ProgressDialog;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.ActivityCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.BaseActivity;
import com.example.dangvanan14.mshiper1.model.AssignDriver;
import com.example.dangvanan14.mshiper1.model.Order;
import com.example.dangvanan14.mshiper1.model.Trip;
import com.example.dangvanan14.mshiper1.module.maps.DirectionFinder;
import com.example.dangvanan14.mshiper1.module.maps.DirectionFinderListener;
import com.example.dangvanan14.mshiper1.module.maps.Route;
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
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.maps.android.ui.IconGenerator;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Sherman on 3/6/2017.
 */

public class TripDetailMapFragment extends BaseFragment implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, LocationListener, OnMapReadyCallback, DirectionFinderListener {
    private static final String TAG = "ADDMapFragment";
    private GoogleMap mMap;
    String lat, lon;
    Marker markerLocation;
    Location mLastLocation;
    private GoogleApiClient mGoogleApiClient;
    private LocationRequest mLocationRequest;
    Marker marker_Find;

    private List<Marker> originMarkers = new ArrayList<>();
    private List<Marker> destinationMarkers = new ArrayList<>();
    private List<Polyline> polylinePaths = new ArrayList<>();
    private Polyline polylinePath;
    private ProgressDialog progressDialog;
    LatLng search_loc;
    private List<Marker> mysearch = new ArrayList<Marker>();

    double latitude = 0;
    double longitude = 0;

    private IconGenerator mIconGenerator = null;
    private int numMakers = 0;
    private List<String> listLocation = new ArrayList<String>();

    View inflaterView;
    private ArrayList<Order> orders;
    private Order order;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        inflaterView = inflater.inflate(R.layout.fragment_maps, container, false);
        Bundle args = getArguments();
        orders = args.getParcelableArrayList("data");
        buildGoogleApiClient();

        return inflaterView;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        SupportMapFragment fragment = (SupportMapFragment) getChildFragmentManager().findFragmentById(R.id.map);
        fragment.getMapAsync(this);

        mIconGenerator = new IconGenerator(getActivity().getApplicationContext());
        mIconGenerator.setStyle(IconGenerator.STYLE_GREEN);

        listLocation.add("Đại học kinh tế thành phố hồ chí minh");
        listLocation.add("Đại học bách khoa thành phố hồ chí minh");
        listLocation.add("Đại học khoa học tự nhiên, thành phố hồ chí minh");
        listLocation.add("182 Lê đại hành,quận 11");
        listLocation.add("Công viên nước đầm sen");
        listLocation.add("Công viên tân phước, quận 11");

        FloatingActionButton fab_loca = (FloatingActionButton) inflaterView.findViewById(R.id.fab_location);
        fab_loca.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (lat != null && lon != null) {
                    if (markerLocation != null)
                        markerLocation.remove();

                    LatLng latLng = new LatLng(Double.parseDouble(lat), Double.parseDouble(lon));
                    markerLocation = mMap.addMarker(new MarkerOptions()
                            .icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_one_pixel))
                            .position(latLng)
                            .title("Bạn đang ở đây!"));
                    CameraUpdate cameraUpdate = CameraUpdateFactory.newLatLngZoom(latLng, 16.0f);
                    mMap.animateCamera(cameraUpdate);
                }

//                Toast.makeText(getActivity(), "lat: " + lat + ", lon: " + lon,
//                        Toast.LENGTH_LONG).show();

            }
        });

        FloatingActionButton fab_direc = (FloatingActionButton) inflaterView.findViewById(R.id.fab_direction);
        fab_direc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!BaseActivity.isNetworkConnected(view.getContext())) {
                    Toast.makeText(view.getContext(), "Internet disconnect", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (numMakers < listLocation.size() - 1)
                    sendRequest(listLocation.get(numMakers), listLocation.get(numMakers + 1));
                numMakers += 1;
            }
        });
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {

        mMap = googleMap;
        LatLng hcmus = new LatLng(10.762963, 106.682394);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(hcmus, 10));

        if (ActivityCompat.checkSelfPermission(this.getActivity(),
                Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(this.getActivity(),
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
        }
        mMap.setMyLocationEnabled(true);
        mMap.getUiSettings().setMyLocationButtonEnabled(false);

//        addMarkerListOrder();
    }

    private void addMarkerListOrder() {
        Bitmap bitmap;
        for (Order o :
                orders) {
            if (orders.size() == 1) {
                order = orders.get(0);
                bitmap = mIconGenerator.makeIcon("");
            } else
                bitmap = mIconGenerator.makeIcon(Integer.toString(numMakers));

            originMarkers.add(mMap.addMarker(new MarkerOptions()
                    .icon(BitmapDescriptorFactory.fromBitmap(bitmap))
                    .title(o.get_address())
                    .position(new LatLng(Double.parseDouble(o.get_latitude()), Double.parseDouble(o.get_longitude())))));
            numMakers++;
        }
    }

    @Override
    public void onDirectionFinderStart() {
        if (order == null)
            progressDialog = ProgressDialog.show(this.getActivity(), "Please wait.",
                    "Finding direction..!", true);

//        if (marker_Find != null)
//            marker_Find.remove();
//
//        if (originMarkers != null) {
//            for (Marker marker : originMarkers) {
//                marker.remove();
//            }
//        }
//
//        if (destinationMarkers != null) {
//            for (Marker marker : destinationMarkers) {
//                marker.remove();
//            }
//        }
//
//        if (polylinePaths != null) {
//            for (Polyline polyline : polylinePaths) {
//                polyline.remove();
//            }
//        }
    }

    @Override
    public void onDirectionFinderSuccess(List<Route> routes) {
        if (order == null)
            progressDialog.dismiss();
        polylinePaths = new ArrayList<>();
        originMarkers = new ArrayList<>();
        destinationMarkers = new ArrayList<>();

        for (Route route : routes) {

//            ((TextView) findViewById(R.id.tvDuration)).setText(route.duration.text);
//            ((TextView) findViewById(R.id.tvDistance)).setText(route.distance.text);
            PolylineOptions polylineOptions = new PolylineOptions().
                    geodesic(true).
                    color(Color.BLUE).
                    width(10);
            for (int i = 0; i < route.points.size(); i++)
                polylineOptions.add(route.points.get(i));

            if (order == null) {
                mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(route.startLocation, 16));
                Bitmap bitmap = mIconGenerator.makeIcon(Integer.toString(numMakers));

                originMarkers.add(mMap.addMarker(new MarkerOptions()
                        .icon(BitmapDescriptorFactory.fromBitmap(bitmap))
                        .title(route.startAddress)
                        .position(route.startLocation)));

                destinationMarkers.add(mMap.addMarker(new MarkerOptions()
                        .icon(BitmapDescriptorFactory.fromBitmap(bitmap))
                        .title(route.endAddress)
                        .position(route.endLocation)));

                polylinePaths.add(mMap.addPolyline(polylineOptions));
            } else {
                if (polylinePath != null) {
                    Log.d("TAG", "onDirectionFinderSuccess: " + polylinePath.getId());
                    polylinePath.remove();
                }
                polylinePath = mMap.addPolyline(polylineOptions);
            }
        }
    }

    @Override
    public void onConnected(Bundle bundle) {
        mLocationRequest = LocationRequest.create();
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        mLocationRequest.setInterval(500); // Update location every second

        if (ActivityCompat.checkSelfPermission(this.getActivity(),
                Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(this.getActivity(),
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            return;
        }
        LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient, mLocationRequest, this);
        mLastLocation = LocationServices.FusedLocationApi.getLastLocation(
                mGoogleApiClient);
        if (mLastLocation != null) {
            lat = String.valueOf(mLastLocation.getLatitude());
            lon = String.valueOf(mLastLocation.getLongitude());
        }
    }

    @Override
    public void onConnectionSuspended(int i) {

    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
        buildGoogleApiClient();
    }

    synchronized void buildGoogleApiClient() {
        mGoogleApiClient = new GoogleApiClient.Builder(this.getActivity())
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API)
                .build();
    }

    @Override
    public void onLocationChanged(Location location) {
        lat = String.valueOf(location.getLatitude());
        lon = String.valueOf(location.getLongitude());
        Log.d(TAG, "onLocationChanged: " + lat + "  " + lon);
        latitude = Double.parseDouble(String.valueOf(location.getLatitude()));
        longitude = Double.parseDouble(String.valueOf(location.getLongitude()));

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
            if (order != null)
                sendRequest(Double.parseDouble(lat) + "," + Double.parseDouble(lon),
                        Double.parseDouble(order.get_latitude()) + "," + Double.parseDouble(order.get_longitude()));

        }
    }

    private void sendRequest(String origin, String destination) {
        if (origin.isEmpty()) {
            Toast.makeText(this.getActivity(), "Please enter origin address!", Toast.LENGTH_SHORT).show();
            return;
        }
        if (destination.isEmpty()) {
            Toast.makeText(this.getActivity(), "Please enter destination address!", Toast.LENGTH_SHORT).show();
            return;
        }

        try {
            new DirectionFinder(this, origin, destination).execute();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onStart() {
        super.onStart();
        mGoogleApiClient.connect();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mGoogleApiClient.disconnect();
    }

    @Override
    public void onStop() {
        super.onStop();
    }

    public void removeFindPath() {
        if (originMarkers != null) {
            for (Marker marker : originMarkers) {
                marker.remove();
            }
        }

        if (destinationMarkers != null) {
            for (Marker marker : destinationMarkers) {
                marker.remove();
            }
        }

        if (polylinePaths != null) {
            for (Polyline polyline : polylinePaths) {
                polyline.remove();
            }
        }
    }

    public void getLocationFromAddress(String strAddress) {

        Geocoder coder = new Geocoder(this.getActivity());
        List<Address> address;
        try {
            address = coder.getFromLocationName(strAddress, 1);
            if (address == null) {
                return;
            }
            Address location = address.get(0);
            search_loc = new LatLng((location.getLatitude()), (location.getLongitude()));
            marker_Find = mMap.addMarker(new MarkerOptions()
                    .icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_loc))
                    .title(strAddress)
                    .position(search_loc));
            mysearch.add(marker_Find);
            //mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(search_loc, 13));
            CameraUpdate cameraUpdate = CameraUpdateFactory.newLatLngZoom(search_loc, 16.0f);
            mMap.animateCamera(cameraUpdate);

        } catch (IOException e) {
            e.printStackTrace();
            Log.e(TAG, "getLocationFromAddress: " + e.getMessage());
        }
    }

    public static TripDetailMapFragment newInstance(Trip trip) {
        TripDetailMapFragment map = new TripDetailMapFragment();
        Bundle args = new Bundle();
        args.putParcelable("data", trip);
        map.setArguments(args);
        return map;
    }
}