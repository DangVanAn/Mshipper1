package com.example.dangvanan14.mshiper1.activity;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.AssignDriverRecyclerAdapter;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.model.AssignDriver;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
import com.example.dangvanan14.mshiper1.model.User;
import com.example.dangvanan14.mshiper1.response.RepPost;
import com.example.dangvanan14.mshiper1.tool.Boundary;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.slf4j.Logger;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;

public class AssignDriverActivity extends BaseActivity implements View.OnClickListener {
    private static final String TAG = "AssignDriverActivity";
    private AssignDriverRecyclerAdapter mAdapter;
    private List<AssignDriver> assignDrivers = new ArrayList<>();

    @Override
    public void onPermissionsGranted(int requestCode) {
        Toast.makeText(this, "Permissions Received.", Toast.LENGTH_LONG).show();
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_assign_driver);
        setupToolbar();
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.rv_assign_driver);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(mLayoutManager);

        mAdapter = new AssignDriverRecyclerAdapter(assignDrivers);
        recyclerView.setAdapter(mAdapter);
        getAssignDriver(App.getUser().get_id());
    }

    public void setupToolbar() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle("Các chuyến hàng");
        toolbar.setNavigationOnClickListener(v -> onBackPressed());
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

    @Override
    public void onClick(View v) {

    }

    private void getAssignDriver(final String _id) {
        final LoadData<RepPost> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                User u = new User();
                u.set_id(_id);
                return loadData.CreateRetrofit().getAssign(u);
            }
        }, new LoadData.CallbackDelegate<>(this, new CallbackgetAssignDriver()));
    }

    private static class CallbackgetAssignDriver extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(Activity activity, RepPost body, Logger LOG) {
            AssignDriverActivity ac = (AssignDriverActivity) activity;
            ac.dismissProgressDialog();
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());
                Gson gson = new Gson();
                Type listType = new TypeToken<List<AssignDriver>>() {
                }.getType();
                List<AssignDriver> assignDrivers = gson.fromJson(body.getData(), listType);

                addPercentInAssignDriver(assignDrivers);

                ac.assignDrivers.addAll(assignDrivers);

                ac.mAdapter.notifyDataSetChanged();
            } else {
                Toast.makeText(ac, body.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Activity activity, Throwable t, Logger LOG) {
            Log.e("TAG", "onFailure: " + t.getMessage());
        }
    }

    public static void addPercentInAssignDriver(List<AssignDriver> assignDrivers) {
        for (AssignDriver ad :
                assignDrivers) {
            float sum = 0;
            float complete = 0;
            sum++;
            if (ad.get_driver_accept() != 0) {
                complete++;
            }

            for (PreOrderSumAssign sumAssign : ad.get_pre_order_sum_assign()) {
                sum++;
                if (sumAssign.get_start_pickup() != 0) {
                    complete++;
                }

                sum++;
                if (sumAssign.get_in_warehouse_driver() != 0) {
                    complete++;
                }

                sum++;
                if (sumAssign.get_in_line_driver() != 0) {
                    complete++;
                }

                sum++;
                if (sumAssign.get_out_line_driver() != 0) {
                    complete++;
                }

                sum++;
                if (sumAssign.get_out_warehouse_driver() != 0) {
                    complete++;
                }

                sum++;
                if (sumAssign.get_in_delivery_driver() != 0) {
                    complete++;
                }

                sum++;
                if (sumAssign.get_time_done() != 0) {
                    complete++;
                }
            }

            Log.d(TAG, "addPercentInAssignDriver:1" + (complete / sum) * 100);
            Log.d(TAG, "addPercentInAssignDriver:2" + complete);
            Log.d(TAG, "addPercentInAssignDriver:3" + sum);
            ad.set_percent((int) ((complete / sum) * 100));
        }
    }
}
