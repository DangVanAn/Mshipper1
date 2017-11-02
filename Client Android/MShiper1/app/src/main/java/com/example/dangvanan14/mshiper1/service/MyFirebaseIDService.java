package com.example.dangvanan14.mshiper1.service;

import android.app.Activity;
import android.support.v4.app.Fragment;
import android.util.Log;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.model.User;
import com.example.dangvanan14.mshiper1.response.RepPost;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

import org.slf4j.Logger;

import java.util.concurrent.Callable;

import retrofit2.Call;

public class MyFirebaseIDService  extends FirebaseInstanceIdService {
    private static final String TAG = "MyFirebaseIDService";

    @Override
    public void onTokenRefresh() {
        super.onTokenRefresh();
        String token= FirebaseInstanceId.getInstance().getToken();
        updateDeviceToken(token);
    }

    private void updateDeviceToken(String token) {
        if (((App)getApplication()).getUser() == null)
            return;

        LoadData<RepPost> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                String phone = ((App)getApplication()).getUser().get_phone();
                return loadData.CreateRetrofit().postDeviceToken(new User(phone, token));
            }
        }, new LoadData.CallbackDelegate<RepPost>(new CallBackImpl()));
    }

    private static class CallBackImpl extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(RepPost body, Logger log) {
            Log.d(TAG, "onResponse: " + body.getMessage());
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
//                Toast.makeText(ac, body.getMessage(), Toast.LENGTH_SHORT).show();
            } else {
//                Toast.makeText(, body.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Throwable t, Logger LOG) {
            Log.e("TAG", "onFailure: Sai rồi nè");
        }
    }
}
