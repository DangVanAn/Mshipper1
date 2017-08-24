package com.example.dangvanan14.mshiper1;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.activity.BaseActivity;
import com.example.dangvanan14.mshiper1.activity.MainActivity;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.model.User;
import com.example.dangvanan14.mshiper1.response.RepPost;

import org.slf4j.Logger;

import java.util.concurrent.Callable;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import retrofit2.Call;

public class Activity_login extends BaseActivity {

    @BindView(R.id.tv_username)
    EditText tv_username;

    @BindView(R.id.tv_password)
    EditText tv_password;

    @BindView(R.id.btn_signin)
    Button btn_signin;

    public LoadData<RepPost> loadData;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        loadData = new LoadData<>();
        ButterKnife.bind(this);

        tv_username.requestFocus();
        InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
        //show soft keyboard fragment
        imm.toggleSoftInput(InputMethodManager.SHOW_FORCED, InputMethodManager.HIDE_IMPLICIT_ONLY);
        imm.showSoftInput(tv_username, InputMethodManager.SHOW_IMPLICIT);
    }

    @Override
    public void onPermissionsGranted(int requestCode) {
        //sử lý permission tại đây
    }

    @OnClick(R.id.btn_signin)
    public void submit() {
        String username = tv_username.getText().toString();
        String password = tv_password.getText().toString();

        showProgressDialog();

        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                return loadData.CreateRetrofit().postLogin(new User(password, username));
            }
        }, new LoadData.CallbackDelegate<RepPost>(this, new CallBackImpl()));
    }

    static class CallBackImpl implements ICallbackApi<RepPost> {
        @Override
        public void onResponse(Fragment fragment, RepPost body, Logger LOG) {

        }

        @Override
        public void onResponse(Activity activity, RepPost body, Logger LOG) {
            Activity_login ac = (Activity_login) activity;
            ac.dismissProgressDialog();
            if (body.isSuccess())
            {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());
                Intent i = new Intent(ac, MainActivity.class);
                activity.startActivity(i);
                Toast.makeText(ac, "Xin chào mừng đến Mshipper", Toast.LENGTH_SHORT).show();
            }
            else
            {
                Toast.makeText(ac, body.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onResponse(RepPost body, Logger log) {
            Log.d("TAG", "onResponse: " + body.getMessage());
        }

        @Override
        public void onFailure(Fragment fragment, Throwable t, Logger LOG) {

        }

        @Override
        public void onFailure(Activity activity, Throwable t, Logger LOG) {

        }

        @Override
        public void onFailure(Throwable t, Logger LOG) {
            Log.e("TAG", "onFailure: Sai rồi nè");
        }
    }
}
