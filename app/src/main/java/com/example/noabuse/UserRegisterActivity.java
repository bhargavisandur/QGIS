package com.example.noabuse;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserRegisterActivity extends AppCompatActivity {


    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL="";

    public void register(View view){

       EditText name= (EditText) findViewById(R.id.nameR);
       EditText password=(EditText) findViewById(R.id.passwordR);
       EditText email= (EditText) findViewById(R.id.emailR);
       EditText contact= (EditText) findViewById(R.id.contactR);

        HashMap<String, String> map= new HashMap<>();
        map.put("name", name.getText().toString());
        map.put("password", password.getText().toString());
        map.put("email", email.getText().toString());
        map.put("contact", contact.getText().toString());

        Call<Void> call=retrofitInterface.executeSignup(map);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.code()==200)
                {
                    Toast.makeText(UserRegisterActivity.this, "signUp successful!", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(getApplicationContext(), UserLoginActivity.class);
                    startActivity(intent);
                }
                else if(response.code()==400){
                    Toast.makeText(UserRegisterActivity.this, "Already Registered", Toast.LENGTH_SHORT).show();

                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(UserRegisterActivity.this,t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });



    }
    public void loginPage(View view){
//        Intent intent= new Intent(getApplicationContext(), UserLoginActivity.class);
//        startActivity(intent);
        finish();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_register);
        retrofit= new Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(GsonConverterFactory.create()).build();
        retrofitInterface= retrofit.create(RetrofitInterface.class);
    }
}
