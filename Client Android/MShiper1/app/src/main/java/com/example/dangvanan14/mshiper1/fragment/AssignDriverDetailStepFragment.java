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
import android.widget.Button;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.AssignDriverDetailRecyclerAdapter;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.model.AssignDriver;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
import com.example.dangvanan14.mshiper1.model.Step;
import com.example.dangvanan14.mshiper1.response.RepPost;

import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;

public class AssignDriverDetailStepFragment extends BaseFragment implements View.OnClickListener {
    private static final String TAG = "ADDStepFragment";
    private AssignDriverDetailRecyclerAdapter mAdapter;
    private AssignDriver assignDriver;
    private Button btnConfirm;
    private Button btnExtend;
    public Step selectedStep;
    private List<AssignDriverDetailRecyclerAdapter.StepExpandableGroup> steps;

    public static AssignDriverDetailStepFragment newInstance(AssignDriver assignDriver) {
        AssignDriverDetailStepFragment fg = new AssignDriverDetailStepFragment();
        Bundle args = new Bundle();
        args.putParcelable("assignDetail", assignDriver);
        fg.setArguments(args);
        return fg;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_assign_driver_detail_step, container, false);
        Bundle args = getArguments();
        assignDriver = args.getParcelable("assignDetail");

        btnConfirm = (Button) v.findViewById(R.id.btn_confirm);
        btnExtend = (Button) v.findViewById(R.id.btn_extend);

        btnConfirm.setOnClickListener(this);
        btnExtend.setOnClickListener(this);

        RecyclerView recyclerView = (RecyclerView) v.findViewById(R.id.rv_assign_driver);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(mLayoutManager);

        createData();
        mAdapter = new AssignDriverDetailRecyclerAdapter(this, steps);
        recyclerView.setAdapter(mAdapter);

        checkVisibilityBtnExtend();
        return v;
    }
    void checkVisibilityBtnExtend(){
        if (selectedStep != null) {
            if (selectedStep.getElement().equals("_start_pickup"))
                btnExtend.setVisibility(View.VISIBLE);
            else
                btnExtend.setVisibility(View.GONE);
        }
    }

    void createData() {
        steps = new ArrayList<>();
        List<PreOrderSumAssign> preOrderSumAssigns = assignDriver.get_pre_order_sum_assign();
        if (preOrderSumAssigns != null && preOrderSumAssigns.size() > 0) {
            int idStep = -1;
            List<Step> stepList = new ArrayList<>();
            PreOrderSumAssign preOrderSumAssign = preOrderSumAssigns.get(0);

            stepList.add(new Step(++idStep, "Xác nhận nhận đơn hàng", (assignDriver.get_driver_accept() != 0), "_driver_accept"));
            stepList.add(new Step(++idStep, "Xác nhận bắt đầu đi lấy hàng (trước 30p)", preOrderSumAssign.get_start_pickup() != 0, "_start_pickup"));
            stepList.add(new Step(++idStep, "Đã vào kho", preOrderSumAssign.get_in_warehouse_driver() != 0, "_in_warehouse_driver"));
            stepList.add(new Step(++idStep, "Đã vào line", preOrderSumAssign.get_in_line_driver() != 0, "_in_line_driver"));
            stepList.add(new Step(++idStep, "Đã rời line", preOrderSumAssign.get_out_line_driver() != 0, "_out_line_driver"));
            stepList.add(new Step(++idStep, "Đã rời kho", preOrderSumAssign.get_out_warehouse_driver() != 0, "_out_warehouse_driver"));
            for (int i = 0; i < assignDriver.get_pre_order_sum_assign().size(); i++) {
                stepList.add(new Step(++idStep, "Điểm giao", preOrderSumAssign.get_in_delivery_driver() != 0, "_in_delivery_driver"));
            }
            stepList.add(new Step(++idStep, "Hoàn thành", preOrderSumAssign.get_time_done() != 0, "_time_done"));
            int numberDelivery = 0;
            for (int i = 0; i < stepList.size(); i++) {
                List<PreOrderSumAssign> temp = null;
                Step s = stepList.get(i);
                if (s.getElement().equals("_in_delivery_driver")) {
                    if (numberDelivery < assignDriver.get_pre_order_sum_assign().size()) {
                        temp = new ArrayList<>();
                        temp.add(assignDriver.get_pre_order_sum_assign().get(numberDelivery));
                        numberDelivery++;
                    }
                }
                steps.add(new AssignDriverDetailRecyclerAdapter.StepExpandableGroup(s, temp));
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
                    if (assignDriver.get_pre_order_sum_assign().get(0).get_id() != null) {
                        showProgressDialog();
                        postUpdateTimeStep(selectedStep.getElement(), (new Date()).getTime());
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

    private void postUpdateTimeStep(final String element, final long valueTime) {
        final LoadData<RepPost> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                ParamUpdateStep pram = new ParamUpdateStep();
                pram._pre_order_sum_assign = assignDriver.get_pre_order_sum_assign().get(0).get_id();
                pram.element = element;
                pram.time = valueTime;
                return loadData.CreateRetrofit().postUpdateTimeStep(pram);
            }
        }, new LoadData.CallbackDelegate<>(this, new CallbackPostUpdateTimeStep()));
    }

    private static class CallbackPostUpdateTimeStep extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(Fragment fragment, RepPost body, Logger LOG) {
            AssignDriverDetailStepFragment fg = (AssignDriverDetailStepFragment) fragment;
            fg.dismissProgressDialog();
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());
                fg.selectedStep.set_is_confirm(true);
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

    public static class ParamUpdateStep {
        public String _pre_order_sum_assign;
        public String element;
        public long time;

        public ParamUpdateStep() {
        }

        public ParamUpdateStep(String _pre_order_sum_assign, String element, long time) {
            this._pre_order_sum_assign = _pre_order_sum_assign;
            this.element = element;
            this.time = time;
        }
    }
}
