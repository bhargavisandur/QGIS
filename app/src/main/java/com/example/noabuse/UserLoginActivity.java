package com.example.noabuse;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserLoginActivity extends AppCompatActivity {

    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL="https://10.0.2.2:3000";

    public void registerClick(View view){
        Intent intent = new Intent(getApplicationContext(), UserRegisterActivity.class);
        startActivity(intent);
    }
    public void signIn(View view) throws JSONException {
       EditText emailEdit= (EditText) findViewById(R.id.username);
       EditText passwordEdit=(EditText) findViewById(R.id.password);
       HashMap<String ,String>map = new HashMap<>();
       map.put("email", emailEdit.getText().toString());
       map.put("password", passwordEdit.getText().toString());
       Call<LoginResult> call= retrofitInterface.executeLogin(map);

       call.enqueue(new Callback<LoginResult>() {
            @Override
            public void onResponse(Call<LoginResult> call, Response<LoginResult> response) {
                if(response.code()==200)
                {
                    LoginResult result= response.body();
                    Intent intent= new Intent(getApplicationContext(), UserActivity.class);
                    String name= result.getName();
                    String contact = result.getContact();
                    intent.putExtra("name", name);
                    intent.putExtra("contact", contact);
                    startActivity(intent);
                }
                else if(response.code()==404){
                    Toast.makeText(UserLoginActivity.this, "Wrong Credentials", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResult> call, Throwable t) {
                Toast.makeText(UserLoginActivity.this,t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_login);
        retrofit= new Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(GsonConverterFactory.create()).build();
        retrofitInterface= retrofit.create(RetrofitInterface.class);
    }
}
