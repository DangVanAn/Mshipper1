package com.example.dangvanan14.mshiper1;

import com.example.dangvanan14.mshiper1.model.Detail;
import com.example.dangvanan14.mshiper1.model.Location;
import com.example.dangvanan14.mshiper1.model.Order;
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

    @POST("locations/postLocation")
    Call<RepPost> postLocation(@Body Location location);

    @GET("orders/getOrderByIdDeliveryMan")
    Call<List<Order>> getOrderByIdDeliveryMan(@Query("_id_delivery_man") String _id_delivery_man);

    @GET("details/getbyidorder")
    Call<List<Detail>> getDetailByIdOrder(@Query("_id") String _id_order);
}