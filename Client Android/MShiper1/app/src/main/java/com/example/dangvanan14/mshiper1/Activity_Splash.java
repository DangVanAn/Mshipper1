package com.example.dangvanan14.mshiper1;

import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.drawable.AnimationDrawable;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v4.content.res.ResourcesCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;
import android.view.WindowManager;
import android.view.View;
import android.content.Intent;
import android.graphics.drawable.AnimationDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v4.content.res.ResourcesCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.BaseActivity;
import com.example.dangvanan14.mshiper1.activity.MainActivity;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.model.User;
import com.google.gson.Gson;

import java.lang.ref.WeakReference;
import java.util.Objects;

import butterknife.ButterKnife;


public class Activity_Splash extends BaseActivity {
    public final static int SLASH_TIME = 1000;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        ButterKnife.bind(this);


        LoadingDataTask task = new LoadingDataTask(this);
        task.execute();
    }

    @Override
    public void onPermissionsGranted(int requestCode) {

    }

    public boolean isUserLogin()
    {
        SharedPreferences prefs = getSharedPreferences(DefinedApp.SharedPreferencesKey, Context.MODE_PRIVATE);
        String userStr = prefs.getString(DefinedApp.UserShaPreKey, "");
        if(userStr.equals("")){
            return false;
        }
        Gson gson = new Gson();
        User user = gson.fromJson(userStr, User.class);
        getApp().setUser(user);

        return true;
    }

    private static class LoadingDataTask extends AsyncTask<Void, Void, Void> {
        private WeakReference<Activity_Splash> activityWeakReference;

        public LoadingDataTask(Activity_Splash activity) {
            this.activityWeakReference = new WeakReference<>(activity);
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            Activity_Splash activity = activityWeakReference.get();

            if (activity != null && !activity.isDestroyed() && !activity.isFinishing()) {
                //activity.runAnimationLogo();
            }
        }

        @Override
        protected Void doInBackground(Void... params) {
            long endTime = System.currentTimeMillis() + 1000;
            while (System.currentTimeMillis() < endTime) {
                synchronized (this) {
                    try {
                        wait(endTime - System.currentTimeMillis());
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);

            Activity_Splash activity = activityWeakReference.get();

            if (activity != null && !activity.isDestroyed() && !activity.isFinishing()) {
                activity.updateWithToken();

            }
        }
    }

    private void updateWithToken() {

        String currentAccessToken = "..";

        if (currentAccessToken != null) {
            new Handler().postDelayed(new Runnable() {

                @Override
                public void run() {
                    Intent i;
                    if (!isUserLogin()) {
                        i = new Intent(Activity_Splash.this, Activity_login.class);
                    }else{
                        i = new Intent(Activity_Splash.this, MainActivity.class);
                    }
                    startActivity(i);
                    finish();
                }
            }, SLASH_TIME);
        } else {
            new Handler().postDelayed(new Runnable() {

                @Override
                public void run() {
//                    Intent i = new Intent(Activity_Splash.this, LoginActivity.class);
//                    i.addFlags(Intent.FLAG_ACTIVITY_PREVIOUS_IS_TOP);
//                    startActivity(i);

                    finish();
                }
            }, SLASH_TIME);
        }
    }

//    private void runAnimationLogo() {
//        AnimationDrawable animation2 = new AnimationDrawable();
//        animation2.addFrame(ResourcesCompat.getDrawable(getResources(), R.drawable.logo_login, null), 100);
//        animation2.addFrame(ResourcesCompat.getDrawable(getResources(), R.drawable.logo_login2, null), 1000);
//        animation2.setOneShot(false);
//        imageView.setImageDrawable(animation2);
//        animation2.start();
//    }
}
