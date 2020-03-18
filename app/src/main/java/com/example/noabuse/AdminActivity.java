package com.example.noabuse;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class AdminActivity extends AppCompatActivity {

    public void addCrimeCell(View view){
        Intent intent = new Intent(getApplicationContext(),CrimeCellActivity.class );
        startActivity(intent);
    }
    public void addOrphanage(View view){
        Intent intent = new Intent(getApplicationContext(),OrphanageActivity.class );
        startActivity(intent);
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin);
    }
}
