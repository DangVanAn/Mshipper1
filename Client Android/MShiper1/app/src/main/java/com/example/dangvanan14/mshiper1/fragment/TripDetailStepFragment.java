package com.example.dangvanan14.mshiper1.fragment;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.TripDetailRecyclerAdapter;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.model.AssignDriver;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
import com.example.dangvanan14.mshiper1.model.Step;
import com.example.dangvanan14.mshiper1.model.Trip;
import com.example.dangvanan14.mshiper1.response.RepPost;
import com.example.dangvanan14.mshiper1.service.TrackingService;
import com.example.dangvanan14.mshiper1.tool.ServiceTool;

import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;

public class TripDetailStepFragment extends BaseFragment implements View.OnClickListener {
    private static final String TAG = "ADDStepFragment";
    private TripDetailRecyclerAdapter mAdapter;
    private Trip trip;
    private Button btnConfirm;
    private Button btnExtend;
    public Step selectedStep;
    private List<TripDetailRecyclerAdapter.StepExpandableGroup> steps;
    private View layoutButton;
    private List<String> idList = new ArrayList<>();
    private String elementSelected;

    public static TripDetailStepFragment newInstance(Trip trip) {
        TripDetailStepFragment fg = new TripDetailStepFragment();
        Bundle args = new Bundle();
        args.putParcelable("tripDetail", trip);
        fg.setArguments(args);
        return fg;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_assign_driver_detail_step, container, false);
        Bundle args = getArguments();
        trip = args.getParcelable("tripDetail");

        layoutButton = v.findViewById(R.id.layout_button_assign_driver);
        btnConfirm = (Button) v.findViewById(R.id.btn_confirm);
        btnExtend = (Button) v.findViewById(R.id.btn_extend);

        btnConfirm.setOnClickListener(this);
        btnExtend.setOnClickListener(this);

        RecyclerView recyclerView = (RecyclerView) v.findViewById(R.id.rv_assign_driver);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(mLayoutManager);

        createData();
        mAdapter = new TripDetailRecyclerAdapter(this, steps);
        recyclerView.setAdapter(mAdapter);

        checkVisibilityBtnExtend();
        return v;
    }

    void checkVisibilityBtnExtend() {
        if (selectedStep != null) {
            if (selectedStep.getElement().equals("_in_warehouse_driver"))
                btnExtend.setVisibility(View.VISIBLE);
            else
                btnExtend.setVisibility(View.GONE);

            if (selectedStep.getElement().equals("_in_delivery_driver")) {
                layoutButton.setVisibility(View.GONE);
            } else {
                layoutButton.setVisibility(View.VISIBLE);
            }
        } else {
            layoutButton.setVisibility(View.GONE);
        }
    }

    void createData() {
        steps = new ArrayList<>();

        boolean startPickup = true;
        boolean inWarehouseDriver = true;
        boolean inLineDriver = true;
        boolean outLineDriver = true;
        boolean outWarehouseDriver = true;
        long[] timeDoneArr;

        if (trip != null && trip.getData() != null && trip.getData().size() > 0) {
            timeDoneArr = new long[trip.getData().size()];
            int i = 0;
            for (AssignDriver assignDriver : trip.getData()) {
                List<PreOrderSumAssign> preOrderSumAssigns = assignDriver.get_pre_order_sum_assign();
                if (preOrderSumAssigns == null || preOrderSumAssigns.size() <= 0)
                    return;
                PreOrderSumAssign preOrderSumAssign = preOrderSumAssigns.get(0);

                idList.add(preOrderSumAssign.get_id());
                if (preOrderSumAssign.get_start_pickup() == 0)
                    startPickup = false;
                if (preOrderSumAssign.get_in_warehouse_driver() == 0)
                    inWarehouseDriver = false;
                if (preOrderSumAssign.get_in_line_driver() == 0)
                    inLineDriver = false;
                if (preOrderSumAssign.get_out_line_driver() == 0)
                    outLineDriver = false;
                if (preOrderSumAssign.get_out_warehouse_driver() == 0)
                    outWarehouseDriver = false;
                timeDoneArr[i] = preOrderSumAssign.get_time_done();
                i++;
            }

            int idStep = -1;
            List<Step> stepList = new ArrayList<>();

            stepList.add(new Step(++idStep, "Xác nhận bắt đầu đi lấy hàng (trước 30p)", startPickup, "_start_pickup", idList));
            stepList.add(new Step(++idStep, "Đã vào kho", inWarehouseDriver, "_in_warehouse_driver", idList));
            stepList.add(new Step(++idStep, "Đã vào line", inLineDriver, "_in_line_driver", idList));
            stepList.add(new Step(++idStep, "Đã rời line", outLineDriver, "_out_line_driver", idList));
            stepList.add(new Step(++idStep, "Đã rời kho", outWarehouseDriver, "_out_warehouse_driver", idList));
            for (int j = 0; j < timeDoneArr.length; j++) {
                List<String> id = new ArrayList<>();
                id.add(idList.get(j));
                stepList.add(new Step(++idStep, "Điểm giao " + (j + 1), timeDoneArr[j] != 0, "_in_delivery_driver", id));
            }
            int numberDelivery = 0;
            for (int j = 0; j < stepList.size(); j++) {
                List<PreOrderSumAssign> temp = null;
                Step s = stepList.get(j);
                if (s.getElement().equals("_in_delivery_driver")) {
                    if (numberDelivery < trip.getData().size()) {
                        temp = new ArrayList<>();
                        temp.add(trip.getData().get(numberDelivery).get_pre_order_sum_assign().get(0));
                        numberDelivery++;
                    }
                }
                steps.add(new TripDetailRecyclerAdapter.StepExpandableGroup(s, temp));
                if (!s.is_confirm() && selectedStep == null) {
                    selectedStep = s;
                }
            }
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_confirm:
                try {
                    if (selectedStep != null) {
                        if (selectedStep.getElement().equals("_start_pickup") && ServiceTool.isServiceRunning(TrackingService.class, v.getContext())) {
                            Toast.makeText(v.getContext(), "Bạn đang thực hiện Tracking chuyến đi khác", Toast.LENGTH_SHORT).show();
                            return;
                        }
                        showProgressDialog();
                        long timeNow = (new Date()).getTime();
                        postUpdateTimeStep(selectedStep.getIdAssign(), selectedStep.getElement(), timeNow);
                        updateTimeTrip(selectedStep.getIdAssign(), selectedStep.getElement(), timeNow);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.d(TAG, "onClick: " + e.getMessage());
                    Toast.makeText(getContext(), "Có lỗi xảy ra", Toast.LENGTH_SHORT).show();
                }
                break;
            case R.id.btn_extend:

                break;
        }
    }

    public void postUpdateTimeStep(List<String> id, final String element, final long valueTime) {
        elementSelected = element;
        final LoadData<RepPost> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                ParamUpdateStep pram = new ParamUpdateStep();
                pram._pre_order_sum_assign = id;
                pram.element = element;
                pram.time = valueTime;
                return loadData.CreateRetrofit().postUpdateTimeStep(pram);
            }
        }, new LoadData.CallbackDelegate<>(this, new CallbackPostUpdateTimeStep()));
    }

    private static class CallbackPostUpdateTimeStep extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(Fragment fragment, RepPost body, Logger LOG) {
            TripDetailStepFragment fg = (TripDetailStepFragment) fragment;
            fg.dismissProgressDialog();
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());
                if (fg.elementSelected == null)
                    return;

                if (fg.elementSelected.equals("_start_pickup")) {
                    Intent intent = new Intent(fg.getContext(), TrackingService.class);
                    intent.putExtra("trip", fg.trip);
                    intent.putStringArrayListExtra("ids", (ArrayList<String>) fg.idList);
                    fg.getContext().startService(intent);
                }
                if (!fg.elementSelected.equals("_in_delivery_driver")) {
                    fg.selectedStep.set_is_confirm(true);
                }
                if (fg.elementSelected.equals("_time_done")) {
                    Intent intent = new Intent(DefinedApp.BROADCAST_REMOVE_ID_PREORDERSUMASSIGN);
                    intent.putExtra("id_pre_order_sum_assign", fg.selectedStep.getIdAssign().get(0));
                    fg.getContext().sendBroadcast(intent);
                }

                if (fg.selectedStep.get_id() < fg.steps.size() - 1) {
                    fg.selectedStep = fg.steps.get(fg.selectedStep.get_id() + 1).getStep();
                    fg.checkVisibilityBtnExtend();
                    Toast.makeText(fg.getContext(), fg.selectedStep.getElement(), Toast.LENGTH_SHORT).show();
                } else {
                    fg.btnConfirm.setEnabled(false);
                }
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

    public void updateTimeTrip(List<String> ids, String element, long time) {
        List<AssignDriver> assignDrivers = trip.getData();

        for (int i = 0; i < assignDrivers.size(); i++) {
            PreOrderSumAssign temp = assignDrivers.get(i).get_pre_order_sum_assign().get(0);
            for (int j = 0; j < ids.size(); j++) {
                if (temp.get_id().equals(ids.get(j))) {
                    switch (element) {
                        case "_start_pickup":
                            temp.set_start_pickup(time);
                            break;
                        case "_in_warehouse_driver":
                            temp.set_in_warehouse_driver(time);
                            break;
                        case "_in_line_driver":
                            temp.set_in_line_driver(time);
                            break;
                        case "_out_line_driver":
                            temp.set_out_line_driver(time);
                            break;
                        case "_out_warehouse_driver":
                            temp.set_out_warehouse_driver(time);
                            break;
                        case "_in_delivery_driver":
                            temp.set_in_delivery_driver(time);
                            break;
                        case "_time_done":
                            temp.set_time_done(time);
                            break;
                    }
                }
            }
        }
    }

    public static class ParamUpdateStep {
        public List<String> _pre_order_sum_assign;
        public String element;
        public long time;

        public ParamUpdateStep() {
        }
    }
}
