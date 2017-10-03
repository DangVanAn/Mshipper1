package com.example.dangvanan14.mshiper1;

import android.app.Activity;
import android.content.Context;
import android.net.ConnectivityManager;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.DefinedApp;

import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.ref.WeakReference;
import java.util.concurrent.Callable;

import org.slf4j.Logger;

import okhttp3.OkHttpClient;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Converter;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static com.example.dangvanan14.mshiper1.activity.BaseActivity.newDefaultLogging;

// E : kiểu trả về từ server
public class LoadData<E> {
    //    public static String url = "https://mshipperserver.herokuapp.com/";
    public static String url = DefinedApp.URL_SERVER;

    public IWebservice CreateRetrofit() {
        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(newDefaultLogging())
                .build();
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(url)
                .addConverterFactory(GsonConverterFactory.create())
                .client(client)
                .build();
        return retrofit.create(IWebservice.class);
    }

    // func : hàm tương ứng trong IWebService
    // callbackDelegate : callback khi server trả lời
    public void loadData(Callable<Call<E>> func, CallbackDelegate callbackDelegate) {
        Call<E> callGetIngredients;
        try {
            callGetIngredients = func.call();
            callGetIngredients.enqueue(callbackDelegate);
        } catch (Exception e) {
            Log.e("TAG", "loadData: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static class CallbackDelegate<E> implements Callback<E> {
        private boolean isActivity = false;
        private boolean isFragment = false;
        ICallbackApi<E> callback;
        private final Logger LOG = LoggerFactory.getLogger(this.getClass());
        private WeakReference<Fragment> fragmentWeakReference;
        private WeakReference<Activity> activityWeakReference;
        private boolean isService = false;
        public String MY_ERROR = "MY_ERROR";

        // callback: định nghĩa các  callback để bên ngoài setup
        public CallbackDelegate(Fragment fragment, ICallbackApi<E> callback) {
            isFragment = true;
            this.callback = callback;
            fragmentWeakReference = new WeakReference<>(fragment);
        }

        public CallbackDelegate(Activity activity, ICallbackApi<E> callback) {
            isActivity = true;
            this.callback = callback;
            this.activityWeakReference = new WeakReference<>(activity);
        }

        public CallbackDelegate(ICallbackApi<E> callback) {
            isService = true;
            this.callback = callback;
        }

        @Override
        public void onResponse(Call<E> call, Response<E> response) {
            if (response.isSuccessful()) {
                if (isActivity) {
                    Activity activity = activityWeakReference.get();
                    if (activity != null && !activity.isFinishing() && !activity.isDestroyed()) {
                        callback.onResponse(activity, response.body(), LOG);
                    }
                } else if (isFragment) {
                    Fragment fragment = fragmentWeakReference.get();
                    if (fragment != null && !fragment.isRemoving() && !fragment.isDetached()) {
                        callback.onResponse(fragment, response.body(), LOG);
                    }
                } else if (isService) {
                    callback.onResponse(response.body(), LOG);
                }
            } else {
                try {
                    Log.e(MY_ERROR, "onResponse: " + response.errorBody().string());
                } catch (IOException e) {
                    Log.e(MY_ERROR, "onResponse: " + e.getMessage());
                    e.printStackTrace();
                }
            }
        }

        @Override
        public void onFailure(Call<E> call, Throwable t) {
            String message = t.getMessage();
            Log.d("TAG", "onFailure: " + message);
            if (isActivity) {
                Activity activity = activityWeakReference.get();
                if (activity != null && !activity.isFinishing() && !activity.isDestroyed()) {
                    callback.onFailure(activity, t, LOG);
                }
            } else if (isFragment) {
                Fragment fragment = fragmentWeakReference.get();
                if (fragment != null && !fragment.isRemoving() && !fragment.isDetached()) {
                    callback.onFailure(fragment, t, LOG);
                }
            } else if (isService) {
                callback.onFailure(t, LOG);
            }
        }
    }
}