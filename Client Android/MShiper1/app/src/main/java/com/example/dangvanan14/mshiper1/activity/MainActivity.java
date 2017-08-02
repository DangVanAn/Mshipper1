package com.example.dangvanan14.mshiper1.activity;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.AlertDialog;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Parcelable;
import android.provider.Settings;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.content.WakefulBroadcastReceiver;
import android.support.v4.view.ViewPager;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.MenuItem;
import android.widget.Toast;
import android.Manifest;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.MainPagerAdapter;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.customview.CustomViewPager;
import com.example.dangvanan14.mshiper1.model.Order;
import com.example.dangvanan14.mshiper1.service.LocationService;
import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.example.dangvanan14.mshiper1.fragment.FragmentChart;

import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;


public class MainActivity extends BaseActivity
        implements NavigationView.OnNavigationItemSelectedListener, SwipeRefreshLayout.OnRefreshListener {
    BroadcastReceiver receiver = null;
    private SwipeRefreshLayout swipeRefreshLayout;
//    List<Order> orders = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mshipper1);

        App.user.set_email("dmh@gmail.com");
        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayShowTitleEnabled(false);

        swipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipe_refresh_layout);
        swipeRefreshLayout.setOnRefreshListener(this);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();
        MainActivity.super.requestAppPermissions(new
                        String[]{Manifest.permission.INTERNET,
                        Manifest.permission.WAKE_LOCK,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        Manifest.permission.READ_EXTERNAL_STORAGE,
                        Manifest.permission.ACCESS_COARSE_LOCATION,
                        com.example.dangvanan14.mshiper1.Manifest.permission.MAPS_RECEIVE,
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_NETWORK_STATE}, R.string
                        .runtime_permissions_txt
                , REQUEST_PERMISSIONS);
        loadModelAssign();
    }

    private void loadModelAssign() {
        if (!isNetworkConnected(getApplicationContext())) {
            Toast.makeText(getApplicationContext(), "Internet disconnect", Toast.LENGTH_SHORT).show();
            return;
        }
        showProgressDialog();

        final LoadData<List<Order>> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<List<Order>>>() {
            @Override
            public Call<List<Order>> call() throws Exception {
                return loadData.CreateRetrofit().getOrderByIdDeliveryMan(App.user.get_email());
            }
        }, new LoadData.CallbackDelegate<List<Order>>(this, new CallBackImpl()));
    }

    public void setupTabLayout() {
        MainPagerAdapter mAdapter = new MainPagerAdapter(getSupportFragmentManager(), orders);
        ViewPager viewPager = (ViewPager) findViewById(R.id.viewpager);
        viewPager.setAdapter(mAdapter);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tablayout);
        tabLayout.setupWithViewPager(viewPager);

        tabLayout.getTabAt(0).setIcon(R.drawable.ic_order);
        tabLayout.getTabAt(1).setIcon(R.drawable.ic_map);

    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_SEARCH) {
            String id = data.getStringExtra("ID");
            Order order = data.getParcelableExtra("order");
            Intent intent = new Intent(this, DetailActivity.class);
            intent.putExtra("ID", id);
            intent.putExtra("order", order);
            intent.putParcelableArrayListExtra("orders", (ArrayList<? extends Parcelable>) orders);
            startActivity(intent);
        } else {
            IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
            if (result != null) {
                if (result.getContents() == null) {
                    Log.d(TAG, "onActivityResult: Cancelled");
                } else {
                    Log.d(TAG, "onActivityResult: Scanned");
                    Intent intent = new Intent(getApplicationContext(), DetailActivity.class);
                    intent.putExtra("ID", result.getContents());
                    orders = ((App) getApplication()).getOrders();
                    if (orders == null) {
                        Toast.makeText(this, "Không có đơn hàng nào để tìm kiếm!", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    Predicate<Order> predicate = input -> result.getContents().equals(input != null ? input.get_id() : "");
                    Collection<Order> result2 = Collections2.filter(orders, predicate);
                    List<Order> order = new ArrayList<>(result2);

                    intent.putExtra("order", order.get(0));
                    intent.putParcelableArrayListExtra("orders", (ArrayList<? extends Parcelable>) orders);
                    startActivity(intent);
                }
            } else {
                super.onActivityResult(requestCode, resultCode, data);
            }
        }
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.nav_chart) {
            Intent intent = new Intent(this, FragmentChart.class);
            this.startActivity(intent);
        } else if (id == R.id.nav_gallery) {

        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    public void onPermissionsGranted(int requestCode) {
        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        IntentFilter filter = new IntentFilter(LocationService.BROADCAST_ACTION);
        receiver = new WakefulBroadcastReceiver() {
            public void onReceive(Context arg0, Intent arg1) {
                processReceive(arg0, arg1);
            }
        };
        registerReceiver(receiver, filter);


        Intent myAlarm = new Intent(getApplicationContext(), AlarmReceiver.class);
        PendingIntent recurringAlarm = PendingIntent.getBroadcast(getApplicationContext(), 0, myAlarm, PendingIntent.FLAG_CANCEL_CURRENT);
        AlarmManager alarms = (AlarmManager) this.getSystemService(Context.ALARM_SERVICE);
        Calendar updateTime = Calendar.getInstance();
        alarms.setInexactRepeating(AlarmManager.RTC_WAKEUP, updateTime.getTimeInMillis(), AlarmManager.INTERVAL_DAY, recurringAlarm);

    }

    @Override
    public void onRefresh() {
        loadModelAssign();
        swipeRefreshLayout.setRefreshing(true);
    }


    public static class AlarmReceiver extends WakefulBroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            Intent i = new Intent(context, LocationService.class);
            context.startService(i);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(receiver);
    }

    public void processReceive(Context context, Intent intent) {
        double latitude = intent.getDoubleExtra("Latitude", 0.0);
        double longitude = intent.getDoubleExtra("Longitude", 0.0);

        Toast.makeText(context, "GPS thay đổi nè : " + latitude + " , " + longitude, Toast.LENGTH_LONG).show();
    }

    private static class CallBackImpl implements ICallbackApi<List<Order>> {
        @Override
        public void onResponse(Fragment fragment, List<Order> body, Logger LOG) {

        }

        @Override
        public void onResponse(Activity activity, List<Order> body, Logger LOG) {
            MainActivity ac = (MainActivity) activity;
            ac.orders = body;
            ((App) ac.getApplication()).setOrders(body);
            Log.d(TAG, "onResponse: có rồi nè" + body.size());
            ac.dismissProgressDialog();
            ac.swipeRefreshLayout.setRefreshing(false);
            ac.setupTabLayout();
        }

        @Override
        public void onResponse(List<Order> body, Logger log) {

        }

        @Override
        public void onFailure(Fragment fragment, Throwable t, Logger LOG) {

        }

        @Override
        public void onFailure(Activity activity, Throwable t, Logger LOG) {
            Log.e(TAG, "onFailure: Load data failed");
            MainActivity ac = (MainActivity) activity;
            ac.dismissProgressDialog();
            ac.swipeRefreshLayout.setRefreshing(false);
            // show trống dữ liệu
        }

        @Override
        public void onFailure(Throwable t, Logger LOG) {

        }
    }
}
