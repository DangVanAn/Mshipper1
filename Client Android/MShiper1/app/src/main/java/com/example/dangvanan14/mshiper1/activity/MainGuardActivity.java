package com.example.dangvanan14.mshiper1.activity;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.os.Bundle;
import android.support.annotation.IdRes;
import android.support.v7.widget.Toolbar;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.MainPagerAdapter;
import com.example.dangvanan14.mshiper1.customview.CustomViewPager;
import com.google.firebase.messaging.FirebaseMessaging;
import com.roughike.bottombar.BottomBar;
import com.roughike.bottombar.OnTabSelectListener;


public class MainGuardActivity extends BaseActivity {
    BroadcastReceiver receiver = null;
    private CustomViewPager viewPager;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_guard);

        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Bảo vệ");
//        getSupportActionBar().setDisplayShowTitleEnabled(false);

        MainGuardActivity.super.requestAppPermissions(new
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
//        loadStepOrder();
        ////////////////////////////
        FirebaseMessaging.getInstance().subscribeToTopic("VNF");

        setupTabLayout();
        setupBottomBar();
    }

    public void setupBottomBar() {
        BottomBar bottomBar = (BottomBar) findViewById(R.id.bottomBar);
        bottomBar.setOnTabSelectListener(new OnTabSelectListener() {
            @Override
            public void onTabSelected(@IdRes int tabId) {
                switch (tabId) {
                    case R.id.tab_truck:
                        viewPager.setCurrentItem(0);
                        break;
                    case R.id.tab_order:
//                        Intent intentChat = new Intent(getBaseContext(), ChatActivity.class);
//                        startActivity(intentChat);
                        break;
                    case R.id.tab_more:
                        viewPager.setCurrentItem(1);
                        break;
                }
            }
        });
    }

    public void setupTabLayout() {
        MainPagerAdapter mAdapter = new MainPagerAdapter(getSupportFragmentManager(), orders);
        viewPager = (CustomViewPager) findViewById(R.id.viewpager);
        viewPager.setPagingEnabled(false);
        viewPager.setAdapter(mAdapter);
    }

    @Override
    public void onPermissionsGranted(int requestCode) {

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (receiver != null) {
            unregisterReceiver(receiver);
        }
    }
}

