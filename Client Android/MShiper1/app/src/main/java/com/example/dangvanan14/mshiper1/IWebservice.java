package com.example.dangvanan14.mshiper1;

import com.example.dangvanan14.mshiper1.model.Detail;
import com.example.dangvanan14.mshiper1.model.LocationCustom;
import com.example.dangvanan14.mshiper1.model.Order;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssignDrivers;
import com.example.dangvanan14.mshiper1.model.User;
import com.example.dangvanan14.mshiper1.response.RepPost;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface IWebservice {
//    @GET("dishMenu?count=12&page=1")
//    Call<List<Food>> listFoods();

//    @GET("/create_account_facebook")
//    Call<ProfileUser> getProfileInfo(@Query("access_token") String token);
//
//    @POST("/postTest")
//    Call<RecipeResponse> createRecipe(@Body Recipe recipe);
//
//    @POST("/postAvgRating")
//    Call<RatingFragment.RepPost> sendRating(@Query("id_user") String id_user, @Query("id_dishmenu") String id_dishmenu, @Query("Avg") String Avg);

    @POST("users/login")
    Call<RepPost> postLogin(@Body User user);

    @POST("users/updateDeviceToken")
    Call<RepPost> postDeviceToken(@Body User user);

    @POST("locations/postLocation")
    Call<RepPost> postLocation(@Body LocationCustom locationCustom);

    @POST("details/updateStatus")
    Call<RepPost> updateStatus(@Query("_list_detail") String _list_detail);

    @GET("orders/getOrderByIdDeliveryMan")
    Call<List<Order>> getOrderByIdDeliveryMan(@Query("_id_delivery_man") String _id_delivery_man);

    @POST("details/getbyidorder")
    Call<List<Detail>> getDetailByIdOrder(@Body Order _id_order);

    @POST("preorderssumassigndriver/getbydriver")
    Call<RepPost> getbydriver(@Body PreOrderSumAssignDrivers drivers);

    @POST("locations/postLocation")
    Call<RepPost> postLocation3(@Body LocationCustom locationCustom);

    @POST("locations/postLocation")
    Call<RepPost> postLocation4(@Body LocationCustom locationCustom);

}