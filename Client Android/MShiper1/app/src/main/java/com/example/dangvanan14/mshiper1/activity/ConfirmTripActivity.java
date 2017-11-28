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
import com.example.dangvanan14.mshiper1.adapter.ConfirmTripRecyclerAdapter;
import com.example.dangvanan14.mshiper1.adapter.TripRecyclerAdapter;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.model.AssignDriver;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
import com.example.dangvanan14.mshiper1.model.Trip;
import com.example.dangvanan14.mshiper1.model.User;
import com.example.dangvanan14.mshiper1.response.RepPost;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.slf4j.Logger;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;

public class ConfirmTripActivity extends BaseActivity {
    private static final String TAG = "TripActivity";
    private ConfirmTripRecyclerAdapter mAdapter;
    private List<Trip> trips = new ArrayList<>();

    @Override
    public void onPermissionsGranted(int requestCode) {
        Toast.makeText(this, "Permissions Received.", Toast.LENGTH_LONG).show();
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_driver_confirm_trip);
        setupToolbar();
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.rv_confirm_trip);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(mLayoutManager);

        mAdapter = new ConfirmTripRecyclerAdapter(trips);
        recyclerView.setAdapter(mAdapter);
        getTripConfirm(App.getUser().get_id());
    }

    public void setupToolbar() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle("Xác nhận chuyến hàng");
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

    private void getTripConfirm(final String _id) {
        showProgressDialog();
        final LoadData<RepPost> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                User u = new User();
                u.set_id(_id);
                return loadData.CreateRetrofit().getTrip(u);
            }
        }, new LoadData.CallbackDelegate<>(this, new CallbackgetAssignDriver()));
    }

    private static class CallbackgetAssignDriver extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(Activity activity, RepPost body, Logger LOG) {
            ConfirmTripActivity ac = (ConfirmTripActivity) activity;
            ac.dismissProgressDialog();
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());

                Gson gson = new Gson();
                Type listType = new TypeToken<List<Trip>>() {
                }.getType();
                List<Trip> trips = gson.fromJson(body.getData(), listType);

                ac.trips.clear();
                ac.trips.addAll(trips);

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
}
