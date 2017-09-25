package com.example.dangvanan14.mshiper1.activity;

import android.Manifest;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.IdRes;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.fragment.ChatFragment;
import com.example.dangvanan14.mshiper1.fragment.VehicleListFragment;
import com.example.dangvanan14.mshiper1.model.Order;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssignDrivers;
import com.example.dangvanan14.mshiper1.model.User;
import com.example.dangvanan14.mshiper1.response.RepPost;
import com.google.firebase.messaging.FirebaseMessaging;
import com.roughike.bottombar.BottomBar;
import com.roughike.bottombar.OnTabSelectListener;

import org.slf4j.Logger;

import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;


public class MainActivity extends BaseActivity implements SwipeRefreshLayout.OnRefreshListener {
    BroadcastReceiver receiver = null;
    private SwipeRefreshLayout swipeRefreshLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.content_mshipper);

        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayShowTitleEnabled(false);

        swipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipe_refresh_layout);
        swipeRefreshLayout.setOnRefreshListener(this);

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
//        loadStepOrder();
        ////////////////////////////
        FirebaseMessaging.getInstance().subscribeToTopic("fcm");

        BottomBar bottomBar = (BottomBar) findViewById(R.id.bottomBar);
        bottomBar.setOnTabSelectListener(new OnTabSelectListener() {
            @Override
            public void onTabSelected(@IdRes int tabId) {
                FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
                switch (tabId) {
                    case R.id.tab_truck:
                        VehicleListFragment vehicleListFragment = new VehicleListFragment();
                        transaction.replace(R.id.container_fragment, vehicleListFragment);
                        transaction.addToBackStack(null);
                        transaction.commit();

                        break;
                    case R.id.tab_order:
                        ChatFragment newFragment = new ChatFragment();
                        transaction.replace(R.id.container_fragment, newFragment);
                        transaction.addToBackStack(null);
                        transaction.commit();

                        break;
                    case R.id.tab_more:
                        // The tab with id R.id.tab_favorites was selected,
                        // change your content accordingly.
                        Intent intent = new Intent(swipeRefreshLayout.getContext(), MapActivity.class);
                        startActivity(intent);
                        break;
                }
            }
        });
    }
    private void loadModelAssign() {
        if (!isNetworkConnected(getApplicationContext())) {
            Toast.makeText(getApplicationContext(), "Internet disconnect", Toast.LENGTH_SHORT).show();
            return;
        }
//        showProgressDialog();
//
//        final LoadData<List<Order>> loadData = new LoadData<>();
//        loadData.loadData(new Callable<Call<List<Order>>>() {
//            @Override
//            public Call<List<Order>> call() throws Exception {
//                return loadData.CreateRetrofit().getOrderByIdDeliveryMan(App.user.get_email());
//            }
//        }, new LoadData.CallbackDelegate<List<Order>>(this, new CallBackImpl()));
    }
    private void loadStepOrder() {
        if (!isNetworkConnected(getApplicationContext())) {
            Toast.makeText(getApplicationContext(), "Internet disconnect", Toast.LENGTH_SHORT).show();
            return;
        }
        showProgressDialog();

        final LoadData<RepPost> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                return loadData.CreateRetrofit().getbydriver(new PreOrderSumAssignDrivers(((App) getApplication()).getUser().get_id()));
            }
        }, new LoadData.CallbackDelegate<>(this, new CallBackStepOrderImpl()));
    }

    @Override
    public void onBackPressed() {

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        if (resultCode == RESULT_SEARCH) {
//            String id = data.getStringExtra("ID");
//            Order order = data.getParcelableExtra("order");
//            Intent intent = new Intent(this, DetailActivity.class);
//            intent.putExtra("ID", id);
//            intent.putExtra("order", order);
//            intent.putParcelableArrayListExtra("orders", (ArrayList<? extends Parcelable>) orders);
//            startActivity(intent);
//        } else {
//            IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
//            if (result != null) {
//                if (result.getContents() == null) {
//                    Log.d(TAG, "onActivityResult: Cancelled");
//                } else {
//                    Log.d(TAG, "onActivityResult: Scanned");
//                    Intent intent = new Intent(getApplicationContext(), DetailActivity.class);
//                    intent.putExtra("ID", result.getContents());
//                    orders = ((App) getApplication()).getOrders();
//                    if (orders == null) {
//                        Toast.makeText(this, "Không có đơn hàng nào để tìm kiếm!", Toast.LENGTH_SHORT).show();
//                        return;
//                    }
//                    Predicate<Order> predicate = input -> result.getContents().equals(input != null ? input.get_id() : "");
//                    Collection<Order> result2 = Collections2.filter(orders, predicate);
//                    List<Order> order = new ArrayList<>(result2);
//
//                    intent.putExtra("order", order.get(0));
//                    intent.putParcelableArrayListExtra("orders", (ArrayList<? extends Parcelable>) orders);
//                    startActivity(intent);
//                }
//            } else {
//                super.onActivityResult(requestCode, resultCode, data);
//            }
//        }
    }

    @Override
    public void onPermissionsGranted(int requestCode) {

    }

    @Override
    public void onRefresh() {
        loadModelAssign();
        swipeRefreshLayout.setRefreshing(false);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (receiver != null)
        {
            unregisterReceiver(receiver);
        }
    }
    private static class CallBackImpl extends ICallbackApi<List<Order>> {
        @Override
        public void onResponse(Activity activity, List<Order> body, Logger LOG) {
            MainActivity ac = (MainActivity) activity;
            ac.orders = body;
            ((App) ac.getApplication()).setOrders(body);
            Log.d(TAG, "onResponse: có rồi nè" + body.size());
            ac.dismissProgressDialog();
            ac.swipeRefreshLayout.setRefreshing(false);
        }
        @Override
        public void onFailure(Activity activity, Throwable t, Logger LOG) {
            Log.e(TAG, "onFailure: Load data failed");
            MainActivity ac = (MainActivity) activity;
            ac.dismissProgressDialog();
            ac.swipeRefreshLayout.setRefreshing(false);
            // show trống dữ liệu
        }
    }

    private static class CallBackStepOrderImpl extends ICallbackApi<List<Order>> {
        @Override
        public void onResponse(Activity activity, List<Order> body, Logger LOG) {
            MainActivity ac = (MainActivity) activity;
            ac.orders = body;
            ((App) ac.getApplication()).setOrders(body);
            Log.d(TAG, "onResponse: có rồi nè" + body.size());
            ac.dismissProgressDialog();
            ac.swipeRefreshLayout.setRefreshing(false);
        }
        @Override
        public void onFailure(Activity activity, Throwable t, Logger LOG) {
            Log.e(TAG, "onFailure: Load data failed");
            MainActivity ac = (MainActivity) activity;
            ac.dismissProgressDialog();
            ac.swipeRefreshLayout.setRefreshing(false);
            // show trống dữ liệu
        }
    }
}

