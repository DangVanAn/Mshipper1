package com.example.dangvanan14.mshiper1.dialog;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.BaseActivity;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.fragment.TripDetailStepFragment;
import com.example.dangvanan14.mshiper1.model.Detail;
import com.example.dangvanan14.mshiper1.model.PreOrderSum;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
import com.example.dangvanan14.mshiper1.response.RepPost;
import com.example.dangvanan14.mshiper1.service.TrackingService;
import com.example.dangvanan14.mshiper1.tool.ServiceTool;
import com.google.gson.Gson;

import org.slf4j.Logger;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;

public class ConfirmVehicleStateDialogFragment extends BaseDialogFragment implements View.OnClickListener {
    private static final String TAG = "ConfirmVehicleStateDF";
    private PreOrderSumAssign preOrderSumAssign;
    private int status;

    public static ConfirmVehicleStateDialogFragment newInstance(PreOrderSumAssign preOrderSumAssign, int status) {
        ConfirmVehicleStateDialogFragment dialogFragment = new ConfirmVehicleStateDialogFragment();
        dialogFragment.setCancelable(false);
        Bundle args = new Bundle();
        args.putParcelable("data", preOrderSumAssign);
        args.putInt("status", status);
        dialogFragment.setArguments(args);
        return dialogFragment;
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        Dialog dialog = super.onCreateDialog(savedInstanceState);
        dialog.getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        dialog.getWindow().setBackgroundDrawableResource(android.R.color.white);

        return dialog;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        Bundle args = getArguments();
        preOrderSumAssign = args.getParcelable("data");
        status = args.getInt("status");
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.dialog_confirm_vehicle, container, false);

        TextView txtNumberPlate = (TextView) v.findViewById(R.id.txtNumberPlate);
        txtNumberPlate.setText("Biển số: " + preOrderSumAssign.get_number_plate());
        Button btnCancel = (Button) v.findViewById(R.id.btnCancel);
        Button btnSubmit = (Button) v.findViewById(R.id.btnSubmit);

        btnCancel.setOnClickListener(this);
        btnSubmit.setOnClickListener(this);

        return v;
    }

    @Override
    public void onResume() {
        ViewGroup.LayoutParams params = getDialog().getWindow().getAttributes();
        params.width = WindowManager.LayoutParams.MATCH_PARENT;
        params.height = WindowManager.LayoutParams.WRAP_CONTENT;
        getDialog().getWindow().setAttributes((WindowManager.LayoutParams) params);

        getDialog().setOnKeyListener((dialog, keyCode, event) -> {
            if ((keyCode == KeyEvent.KEYCODE_BACK)) {
                if (event.getAction() != KeyEvent.ACTION_DOWN)
                    return true;
                else {
                    dismiss();
                    return true;
                }
            } else
                return false;
        });
        super.onResume();
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnCancel:
                dismiss();
                break;
            case R.id.btnSubmit:
                try {
                    if (preOrderSumAssign != null) {
                        showProgressDialog();
                        long timeNow = (new Date()).getTime();
                        List<String> ids = new ArrayList<>();
                        ids.add(preOrderSumAssign.get_id());

                        String element = "";
                        switch (status) {
                            case 1:
                                element = "_in_warehouse_guard";
                                break;
                            case 2:
                                element = "_in_line_manager_warehouse";
                                break;
                            case 3:
                                element = "_out_line_manager_warehouse";
                                break;
                            case 4:
                                element = "_out_warehouse_guard";
                                break;
//                            case 5:
//                                break;
                            default:
                                return;
                        }

                        postUpdateTimeStep(ids, element, timeNow);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.d(TAG, "onClick: " + e.getMessage());
                    Toast.makeText(getContext(), "Có lỗi xảy ra", Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }

    public void postUpdateTimeStep(List<String> id, final String element, final long valueTime) {
        final LoadData<RepPost> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                TripDetailStepFragment.ParamUpdateStep pram = new TripDetailStepFragment.ParamUpdateStep();
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
            ConfirmVehicleStateDialogFragment fg = (ConfirmVehicleStateDialogFragment) fragment;
            fg.dismissProgressDialog();
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());

                Toast.makeText(fg.getContext(), R.string.repUpdateSuccess, Toast.LENGTH_SHORT).show();
                fg.dismiss();
                fg.dismissProgressDialog();
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
}
