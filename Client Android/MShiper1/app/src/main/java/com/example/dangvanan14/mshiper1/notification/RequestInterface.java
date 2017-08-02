package com.example.dangvanan14.mshiper1.notification;

/**
 * Created by dangvanan14 on 5/20/2017.
 */

import com.example.dangvanan14.mshiper1.notification.RequestBody;
import com.example.dangvanan14.mshiper1.notification.ResponseBody;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface RequestInterface {

    @POST("devices")
    Call<ResponseBody> registerDevice(@Body RequestBody body);
}