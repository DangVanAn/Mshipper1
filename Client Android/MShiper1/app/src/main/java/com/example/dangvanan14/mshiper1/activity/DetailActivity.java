package com.example.dangvanan14.mshiper1.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Parcelable;
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
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.dialog.CancelOrderDialogFragment;
import com.example.dangvanan14.mshiper1.dialog.PayDialogFragment;
import com.example.dangvanan14.mshiper1.fragment.BoxDetailFragment;
import com.example.dangvanan14.mshiper1.model.Detail;
import com.example.dangvanan14.mshiper1.model.Order;
import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

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
    private Button btnCancel;
    private Button btnPay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        order = getIntent().getParcelableExtra("order");

        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle("Chi tiết");

        toolbar.setNavigationOnClickListener(v -> onBackPressed());
        swipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipe_refresh_layout);
        swipeRefreshLayout.setOnRefreshListener(this);

        loadModelDetail();
        btnCancel = (Button) findViewById(R.id.btnCancel);
        btnPay = (Button) findViewById(R.id.btnPay);
        setEnableBtnPay();
        btnCancel.setOnClickListener(this);
        btnPay.setOnClickListener(this);
    }

    private void setEnableBtnPay() {
        if (order.get_order_status().equals(getResources().getString(R.string.statusCancelOrder)) || order.get_order_status().equals(getResources().getString(R.string.statusCompleteOrder))) {
            btnPay.setEnabled(false);
            btnCancel.setEnabled(false);
        } else {
            btnPay.setEnabled(true);
            btnCancel.setEnabled(true);
        }
    }

    private void loadModelDetail() {
        if (!isNetworkConnected(getApplicationContext())) {
            Toast.makeText(getApplicationContext(), "Internet disconnect", Toast.LENGTH_SHORT).show();
            return;
        }
        showProgressDialog();
        final LoadData<List<Detail>> loadData = new LoadData<>();
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

//        onActivityResult

        switch (v.getId()) {
            case R.id.btnCancel:
                prevFrag = getSupportFragmentManager().findFragmentByTag(TAG_CANCEL_ORDER_DIALOG);
                if (prevFrag == null) {
                    CancelOrderDialogFragment newFrag = CancelOrderDialogFragment.newInstance((ArrayList<Detail>) details);

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

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_SEARCH) {
            String id = data.getStringExtra("ID");
            Order order = data.getParcelableExtra("order");
            Intent intent = new Intent(this, DetailActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
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
                    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
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
}
