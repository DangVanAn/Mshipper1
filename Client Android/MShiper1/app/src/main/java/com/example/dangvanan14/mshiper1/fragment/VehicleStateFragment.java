package com.example.dangvanan14.mshiper1.fragment;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
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
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
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

public class VehicleStateFragment extends BaseFragment {
    private static final String TAG = "VehicleStateFragment";
    private List<PreOrderSumAssign> preOrderSumAssignList = new ArrayList<>();
    private VehicleStateRecyclerAdapter mAdapter;

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
        int status = args.getInt("status");
        View v = inflater.inflate(R.layout.fragment_order, container, false);

        if (status == 0) return v;
        RecyclerView recyclerView = (RecyclerView) v.findViewById(R.id.rv_order);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mAdapter = new VehicleStateRecyclerAdapter(getFragmentManager(), preOrderSumAssignList, status);
        recyclerView.setAdapter(mAdapter);

        getVehicleState("VNF", status);
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

    private static class CallbackGetVehicleState extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(Fragment fragment, RepPost body, Logger LOG) {
            VehicleStateFragment fg = (VehicleStateFragment) fragment;
            fg.dismissProgressDialog();
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());
                Gson gson = new Gson();
                Type listType = new TypeToken<List<PreOrderSumAssign>>() {
                }.getType();
                List<PreOrderSumAssign> preOrderSumAssignList = gson.fromJson(body.getData(), listType);

                fg.preOrderSumAssignList.clear();
                fg.preOrderSumAssignList.addAll(preOrderSumAssignList);

                fg.mAdapter.notifyDataSetChanged();
            } else {
                Toast.makeText(fg.getContext(), body.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Activity activity, Throwable t, Logger LOG) {
            Log.e("TAG", "onFailure: " + t.getMessage());
            Toast.makeText(activity, "Có lỗi xảy ra!", Toast.LENGTH_SHORT).show();
        }
    }

    public static class ParamGetVehicleState {
        public String _id_warehouse;
        public int status;
    }
}
