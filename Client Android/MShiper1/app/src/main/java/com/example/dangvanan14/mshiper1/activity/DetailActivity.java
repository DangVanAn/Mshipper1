package com.example.dangvanan14.mshiper1.activity;

import android.content.Intent;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.Toolbar;

import android.support.v4.view.ViewPager;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.DetailPagerAdapter;
import com.example.dangvanan14.mshiper1.dialog.CancelOrderDialogFragment;
import com.example.dangvanan14.mshiper1.dialog.PayDialogFragment;
import com.example.dangvanan14.mshiper1.dialog.ProgressDialogFragment;

public class DetailActivity extends BaseActivity implements View.OnClickListener {
    private static final String TAG_CANCEL_ORDER_DIALOG = "CANCEL ORDER";
    private static final String TAG_PAY_DIALOG = "PAY DIALOG";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle("Chi tiết");
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        setupTabLayout();
        String strId = getIntent().getStringExtra("ID");
        Toast.makeText(this, strId + " của Detail", Toast.LENGTH_SHORT).show();

        Button btnCancel = (Button) findViewById(R.id.btnCancel);
        Button btnPay = (Button) findViewById(R.id.btnPay);
        btnCancel.setOnClickListener(this);
        btnPay.setOnClickListener(this);
    }

    @Override
    public void onPermissionsGranted(int requestCode) {
        Toast.makeText(this, "Permissions Received.", Toast.LENGTH_LONG).show();
    }

    public void setupTabLayout() {
        DetailPagerAdapter mAdapter = new DetailPagerAdapter(getSupportFragmentManager());
        ViewPager viewPager = (ViewPager) findViewById(R.id.viewpager);
        viewPager.setAdapter(mAdapter);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tablayout);
        tabLayout.setupWithViewPager(viewPager);

        tabLayout.getTabAt(2).setIcon(android.R.drawable.ic_dialog_map);
        tabLayout.getTabAt(0).setIcon(android.R.drawable.ic_dialog_info);
        tabLayout.getTabAt(1).setIcon(R.drawable.ic_package);
    }

    @Override
    public void onClick(View v) {
        FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
        Fragment prevFrag;
        switch (v.getId()) {
            case R.id.btnCancel:
                prevFrag = getSupportFragmentManager().findFragmentByTag(TAG_CANCEL_ORDER_DIALOG);
                if (prevFrag == null) {
                    CancelOrderDialogFragment newFrag = CancelOrderDialogFragment.newInstance();

                    ft.add(newFrag, TAG_CANCEL_ORDER_DIALOG);
                } else {
                    ft.remove(prevFrag);
                }
                ft.commitAllowingStateLoss();
                break;
            case R.id.btnPay:
                prevFrag = getSupportFragmentManager().findFragmentByTag(TAG_PAY_DIALOG);
                if (prevFrag == null) {
                    PayDialogFragment newFrag = PayDialogFragment.newInstance();

                    ft.add(newFrag, TAG_PAY_DIALOG);
                } else {
                    ft.remove(prevFrag);
                }
                ft.commitAllowingStateLoss();
                break;
        }
    }
}
