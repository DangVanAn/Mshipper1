package com.example.dangvanan14.mshiper1.dialog;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
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
import android.widget.ImageView;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.BaseActivity;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.model.Detail;
import com.example.dangvanan14.mshiper1.response.RepPost;
import com.google.gson.Gson;

import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class PayDialogFragment extends BaseDialogFragment implements View.OnClickListener {
    private ArrayList<String> id_detail = new ArrayList<>();
    private EditText edtNote;

    public static PayDialogFragment newInstance(ArrayList<String> id_detail) {
        PayDialogFragment dialogFragment = new PayDialogFragment();
        dialogFragment.setCancelable(false);
        Bundle args = new Bundle();
        args.putStringArrayList("data", id_detail);
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
        id_detail = args.getStringArrayList("data");
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.dialog_pay_order, container, false);

        Button btnCancel = (Button) v.findViewById(R.id.btnCancel);
        ImageView btnCash = (ImageView) v.findViewById(R.id.btnSubmit);
        ImageView btnCard = (ImageView) v.findViewById(R.id.btnCard);

        btnCancel.setOnClickListener(this);
        btnCash.setOnClickListener(this);
        btnCard.setOnClickListener(this);

        edtNote = (EditText) v.findViewById(R.id.edt_note);
        edtNote.requestFocus();

        InputMethodManager imm = (InputMethodManager) getActivity().getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.toggleSoftInput(InputMethodManager.SHOW_FORCED, InputMethodManager.HIDE_IMPLICIT_ONLY);
        imm.showSoftInput(edtNote, InputMethodManager.SHOW_IMPLICIT);

        return v;
    }

    @Override
    public void onResume() {
        ViewGroup.LayoutParams params = getDialog().getWindow().getAttributes();
        params.width = WindowManager.LayoutParams.MATCH_PARENT;
        params.height = WindowManager.LayoutParams.WRAP_CONTENT;
        getDialog().getWindow().setAttributes((android.view.WindowManager.LayoutParams) params);

        getDialog().setOnKeyListener(new DialogInterface.OnKeyListener() {
            @Override
            public boolean onKey(android.content.DialogInterface dialog, int keyCode,
                                 android.view.KeyEvent event) {
                if ((keyCode == android.view.KeyEvent.KEYCODE_BACK)) {
                    if (event.getAction() != KeyEvent.ACTION_DOWN)
                        return true;
                    else {
                        dismiss();
                        return true;
                    }
                } else
                    return false;
            }
        });
        super.onResume();
    }

    @Override
    public void onClick(View v) {
        InputMethodManager imm = (InputMethodManager) getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
        switch (v.getId()) {
            case R.id.btnCancel:
                imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                dismiss();
                break;
            case R.id.btnSubmit:
                updateStatusDetail("Cash");
                imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                break;
            case R.id.btnCard:
                updateStatusDetail("Card");
                imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                break;
        }
    }

    private void updateStatusDetail(String _payment_status) {
        if (!BaseActivity.isNetworkConnected(getContext())) {
            Toast.makeText(getContext(), "Internet disconnect", Toast.LENGTH_SHORT).show();
            return;
        }
        showProgressDialog();

        double lat = ((App) getActivity().getApplication()).getLat();
        double lon = ((App) getActivity().getApplication()).getLon();
        if (lat == 0 && lon == 0) {
            Toast.makeText(getContext(), "Vui lòng kiểm tra lại tín hiệu GPS hoặc Network", Toast.LENGTH_SHORT).show();
            return;
        }
        Toast.makeText(getContext(), "latlon : " + lat + " " + lon, Toast.LENGTH_SHORT).show();

        Calendar c = Calendar.getInstance();
        String _note = edtNote.getText().toString();
        final LoadData<RepPost> loadData = new LoadData<>();
        List<Detail> senddetail = new ArrayList<>();
        for (int i = 0; i < id_detail.size(); i++) {
            Detail detail = new Detail();
            detail.set_id_package(id_detail.get(i));
            detail.set_status("Hoàn thành");
            detail.set_note(_note);
            detail.set_pay_type(_payment_status);
            detail.set_latitude_update(lat + "");
            detail.set_longitude_update(lon + "");
            detail.set_delivery_daytime(c.getTimeInMillis());
            senddetail.add(detail);
        }
        Gson gson = new Gson();
        loadData.loadData(() -> loadData.CreateRetrofit().updateStatus(gson.toJson(senddetail)), new LoadData.CallbackDelegate<>(this, new CallBackImpl()));
    }

    private class CallBackImpl implements ICallbackApi<RepPost> {
        @Override
        public void onResponse(Fragment fragment, RepPost body, Logger LOG) {
            Toast.makeText(getContext(), R.string.repUpdateSuccess, Toast.LENGTH_SHORT).show();

            dismiss();
            dismissProgressDialog();
        }

        @Override
        public void onResponse(Activity activity, RepPost body, Logger LOG) {

        }

        @Override
        public void onResponse(RepPost body, Logger log) {

        }

        @Override
        public void onFailure(Fragment fragment, Throwable t, Logger LOG) {
            Log.e("TAG", "onFailure: Load data failed");
            Toast.makeText(getContext(), R.string.repUpdateFailed, Toast.LENGTH_SHORT).show();
            PayDialogFragment ac = (PayDialogFragment) fragment;
            ac.dismissProgressDialog();
        }

        @Override
        public void onFailure(Activity activity, Throwable t, Logger LOG) {

        }

        @Override
        public void onFailure(Throwable t, Logger LOG) {
            Toast.makeText(getContext(), R.string.repUpdateFailed, Toast.LENGTH_SHORT).show();
            dismiss();
            dismissProgressDialog();
        }
    }
}
