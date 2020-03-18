package com.example.noabuse;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class AdminLoginActivity extends AppCompatActivity {

    public EditText username;
    public EditText password;

    public void adminLoginClick(View view){
        username=(EditText) findViewById(R.id.username);
        password=(EditText) findViewById(R.id.passwordR);

        Intent intent = new Intent(getApplicationContext(), AdminActivity.class);
        //add authentication

        startActivity(intent);
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin_login);
    }
}
