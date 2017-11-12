package com.example.dangvanan14.mshiper1.fragment;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.content.WakefulBroadcastReceiver;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.VehicleStateRecyclerAdapter;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.dialog.ConfirmVehicleStateDialogFragment;
import com.example.dangvanan14.mshiper1.model.TripVehicle;
import com.example.dangvanan14.mshiper1.response.RepPost;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.slf4j.Logger;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;

/**
 * Created by Sherman on 3/6/2017.
 */

public class VehicleStateFragment extends BaseFragment implements ConfirmVehicleStateDialogFragment.ConfirmDialogListener, SwipeRefreshLayout.OnRefreshListener {
    private static final String TAG = "VehicleStateFragment";
    private List<TripVehicle> trips = new ArrayList<>();
    private VehicleStateRecyclerAdapter mAdapter;
    private SwipeRefreshLayout swipeRefreshLayout;
    private int status = 0;
    private WakefulBroadcastReceiver receiver;


    public static VehicleStateFragment newInstance(int status) {
        VehicleStateFragment vehicleStateFragment = new VehicleStateFragment();
        Bundle args = new Bundle();
        args.putInt("status", status);
        vehicleStateFragment.setArguments(args);
        return vehicleStateFragment;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        Bundle args = getArguments();
        status = args.getInt("status");
        View v = inflater.inflate(R.layout.fragment_order, container, false);

        swipeRefreshLayout = (SwipeRefreshLayout) v.findViewById(R.id.swipe_refresh_layout);
        swipeRefreshLayout.setOnRefreshListener(this);

        if (status == 0) return v;
        RecyclerView recyclerView = (RecyclerView) v.findViewById(R.id.rv_order);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mAdapter = new VehicleStateRecyclerAdapter(this, getFragmentManager(), trips, status);
        recyclerView.setAdapter(mAdapter);

        getVehicleState("VNF", status);
        listenBroadcast();
        return v;
    }

    public void getVehicleState(final String _id_warehouse, final int status) {
        final LoadData<RepPost> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                VehicleStateFragment.ParamGetVehicleState param = new VehicleStateFragment.ParamGetVehicleState();
                param._id_warehouse = _id_warehouse;
                param.status = status;
                return loadData.CreateRetrofit().getVehicleState(param);
            }
        }, new LoadData.CallbackDelegate<>(this, new CallbackGetVehicleState()));
    }

    @Override
    public void onConfirm(String inputText) {
        Log.d(TAG, "onConfirm: " + inputText);

        TripVehicle temp = null;
        for (TripVehicle tripVehicle :
                trips) {
            if (tripVehicle.get_trip().equals(inputText)) {
                temp = tripVehicle;
                break;
            }
        }
        trips.remove(temp);
        mAdapter.notifyDataSetChanged();
    }

    @Override
    public void onRefresh() {
        if (status == 0) return;
        getVehicleState("VNF", status);
    }

    private static class CallbackGetVehicleState extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(Fragment fragment, RepPost body, Logger LOG) {
            VehicleStateFragment fg = (VehicleStateFragment) fragment;
            fg.swipeRefreshLayout.setRefreshing(false);
            fg.dismissProgressDialog();
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());
                Gson gson = new Gson();
                Type listType = new TypeToken<List<TripVehicle>>() {
                }.getType();
                List<TripVehicle> trips = gson.fromJson(body.getData(), listType);

                fg.trips.clear();
                fg.trips.addAll(trips);

                fg.mAdapter.notifyDataSetChanged();
            } else {
                Toast.makeText(fg.getContext(), body.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Fragment fragment, Throwable t, Logger LOG) {
            try {
                VehicleStateFragment fg = (VehicleStateFragment) fragment;
                fg.swipeRefreshLayout.setRefreshing(false);

                Log.e("TAG", "onFailure: " + t.getMessage());
                Toast.makeText(fragment.getContext(), "Có lỗi xảy ra!", Toast.LENGTH_SHORT).show();
            } catch (Exception e) {
                e.printStackTrace();
                Log.e(TAG, "onFailure: " + e.getMessage());
            }
        }
    }

    public static class ParamGetVehicleState {
        public String _id_warehouse;
        public int status;
    }

    void listenBroadcast() {
        IntentFilter filter = new IntentFilter(DefinedApp.BROADCAST_REFRESH_STATE_VEHICLE);
        receiver = new WakefulBroadcastReceiver() {
            public void onReceive(Context arg0, Intent arg1) {
                Log.d(TAG, "onReceive: có nhận dc nha ");
                getVehicleState("VNF", status);
            }
        };
        getActivity().registerReceiver(receiver, filter);
    }

    @Override
    public void onDestroy() {
        getActivity().unregisterReceiver(receiver);
        super.onDestroy();
    }
}
