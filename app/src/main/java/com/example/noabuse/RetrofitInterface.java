package com.example.noabuse;

import java.util.HashMap;

import retrofit2.http.POST;
import retrofit2.http.Body;
import retrofit2.Call;

public interface RetrofitInterface {

    @POST("/login")
    Call<LoginResult> executeLogin(@Body HashMap<String , String> map);
    @POST("/signup")
    Call<Void> executeSignup(@Body HashMap<String, String> map);


}
