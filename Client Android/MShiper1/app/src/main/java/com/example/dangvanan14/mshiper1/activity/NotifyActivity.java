package com.example.dangvanan14.mshiper1.activity;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.OrderListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.model.Order;

import java.util.ArrayList;
import java.util.List;

public class NotifyActivity extends BaseActivity {

    private RecyclerView recyclerView;
    private OrderListRecyclerAdapter mAdapter;
    private List<Order> listNotify = new ArrayList<>();
    @Override
    public void onPermissionsGranted(int requestCode) {
        Toast.makeText(this, "Permissions Received.", Toast.LENGTH_LONG).show();
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notify);

        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle("Thông báo");

        listNotify.add(new Order("13", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("3", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("2", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("3", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("4", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("1", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("5", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("6", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("2", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("2", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("1", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("11", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("123", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("7", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("12", "19:00", "19/24 binh thơi", 1));
        listNotify.add(new Order("11", "19:00", "19/24 binh thơi", 1));

        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
        recyclerView = (RecyclerView) findViewById(R.id.rv_order);
        recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
        mAdapter = new OrderListRecyclerAdapter(listNotify);
        recyclerView.setAdapter(mAdapter);
    }
}
