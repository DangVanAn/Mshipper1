package com.example.dangvanan14.mshiper1.activity;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.TripDetailPagerAdapter;
import com.example.dangvanan14.mshiper1.customview.CustomViewPager;
import com.example.dangvanan14.mshiper1.model.Trip;

public class TripDetailActivity extends BaseActivity{
    private static final String TAG = "TripActivity";
    private Trip trip;
    @Override
    public void onPermissionsGranted(int requestCode) {
        Toast.makeText(this, "Permissions Received.", Toast.LENGTH_LONG).show();
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_assign_driver_detail);
        trip = getIntent().getParcelableExtra("tripDetail");
        setupTabLayout();
        setupToolbar();
    }

    public void setupTabLayout() {
        TripDetailPagerAdapter mAdapter = new TripDetailPagerAdapter(getSupportFragmentManager(), trip);
        ViewPager viewPager = (ViewPager) findViewById(R.id.vp_assign_driver_detail);
        viewPager.setAdapter(mAdapter);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tl_assign_driver_detail);
        tabLayout.setupWithViewPager(viewPager);

        tabLayout.getTabAt(0).setText("Giai đoạn");
        tabLayout.getTabAt(1).setText("Bản đồ");
    }

    public void setupToolbar() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle("Chi tiết chuyến hàng");
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return true;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
