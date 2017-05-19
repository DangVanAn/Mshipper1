package com.example.dangvanan14.mshiper1.activity;

import android.app.Activity;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.Toolbar;

import android.support.v4.view.ViewPager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.DetailPagerAdapter;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.dialog.CancelOrderDialogFragment;
import com.example.dangvanan14.mshiper1.dialog.PayDialogFragment;
import com.example.dangvanan14.mshiper1.fragment.BoxDetailFragment;
import com.example.dangvanan14.mshiper1.model.Detail;
import com.example.dangvanan14.mshiper1.model.Order;

import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class DetailActivity extends BaseActivity implements View.OnClickListener, SwipeRefreshLayout.OnRefreshListener, BoxDetailFragment.OnSendDataEventListener {
    private static final String TAG_CANCEL_ORDER_DIALOG = "CANCEL ORDER";
    private static final String TAG_PAY_DIALOG = "PAY DIALOG";

    public List<Detail> details = new ArrayList<>();
    public ArrayList<String> id_details = new ArrayList<>();
    public Order order;
    private SwipeRefreshLayout swipeRefreshLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        order = getIntent().getParcelableExtra("order");
        orders = getIntent().getParcelableExtra("orders");

        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle("Chi tiết");

        toolbar.setNavigationOnClickListener(v -> onBackPressed());
        swipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipe_refresh_layout);
        swipeRefreshLayout.setOnRefreshListener(this);

        loadModelDetail();
        Button btnCancel = (Button) findViewById(R.id.btnCancel);
        Button btnPay = (Button) findViewById(R.id.btnPay);
        btnCancel.setOnClickListener(this);
        btnPay.setOnClickListener(this);
    }

    private void loadModelDetail() {
        if (!isNetworkConnected(getApplicationContext())) {
            Toast.makeText(getApplicationContext(), "Internet disconnect", Toast.LENGTH_SHORT).show();
            return;
        }
        showProgressDialog();
        final LoadData<List<Detail>> loadData = new LoadData<>();
        loadData.loadData(() -> loadData.CreateRetrofit().getDetailByIdOrder(new Order(getIntent().getStringExtra("ID"))), new LoadData.CallbackDelegate<List<Detail>>(this, new CallBackImplModelDetail()));
        loadData.loadData(() -> loadData.CreateRetrofit().getDetailByIdOrder(new Order(getIntent().getStringExtra("ID"))), new LoadData.CallbackDelegate<List<Detail>>(this, new CallBackImplModelDetail()));
    }

    @Override
    public void onRefresh() {
        loadModelDetail();
        swipeRefreshLayout.setRefreshing(true);
    }

    @Override
    public void sendSelectedDetail(ArrayList<String> id_package) {
        id_details = id_package;

    }

    private static class CallBackImplModelDetail implements ICallbackApi<List<Detail>> {

        @Override
        public void onResponse(Fragment fragment, List<Detail> body, Logger LOG) {

        }

        @Override
        public void onResponse(Activity activity, List<Detail> body, Logger LOG) {
            DetailActivity ac = (DetailActivity) activity;
            ac.details = body;
            Log.d(TAG, "onResponse: có nữa rồi nè" + body.size());
            ac.dismissProgressDialog();
            ac.swipeRefreshLayout.setRefreshing(false);
            ac.setupTabLayout();
        }

        @Override
        public void onResponse(List<Detail> body, Logger log) {

        }

        @Override
        public void onFailure(Fragment fragment, Throwable t, Logger LOG) {

        }

        @Override
        public void onFailure(Activity activity, Throwable t, Logger LOG) {
            Log.e(TAG, "onFailure: Load data failed");
            DetailActivity ac = (DetailActivity) activity;
            ac.dismissProgressDialog();
            ac.swipeRefreshLayout.setRefreshing(false);
            ac.setupTabLayout();
        }

        @Override
        public void onFailure(Throwable t, Logger LOG) {
        }
    }

    @Override
    public void onPermissionsGranted(int requestCode) {
        Log.d(TAG, "onPermissionsGranted: Permissions Received.");
    }

    public void setupTabLayout() {
        DetailPagerAdapter mAdapter = new DetailPagerAdapter(getSupportFragmentManager(), details, order);
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

        if (id_details.size() == 0) {
            Toast.makeText(this, "Bạn chưa chọn gói hàng nào!!", Toast.LENGTH_SHORT).show();
            return;
        }

        switch (v.getId()) {
            case R.id.btnCancel:
                prevFrag = getSupportFragmentManager().findFragmentByTag(TAG_CANCEL_ORDER_DIALOG);
                if (prevFrag == null) {
                    CancelOrderDialogFragment newFrag = CancelOrderDialogFragment.newInstance(id_details);

                    ft.add(newFrag, TAG_CANCEL_ORDER_DIALOG);
                } else {
                    ft.remove(prevFrag);
                }
                ft.commitAllowingStateLoss();
                break;
            case R.id.btnPay:
                prevFrag = getSupportFragmentManager().findFragmentByTag(TAG_PAY_DIALOG);
                if (prevFrag == null) {
                    PayDialogFragment newFrag = PayDialogFragment.newInstance(id_details);

                    ft.add(newFrag, TAG_PAY_DIALOG);
                } else {
                    ft.remove(prevFrag);
                }
                ft.commitAllowingStateLoss();
                break;
        }
    }
}
