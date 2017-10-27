package com.example.dangvanan14.mshiper1.activity;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.AssignDriverDetailRecyclerAdapter;
import com.example.dangvanan14.mshiper1.model.AssignDriver;
import com.example.dangvanan14.mshiper1.model.PreOrderSum;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;

import java.util.ArrayList;
import java.util.List;

public class AssignDriverDetailActivity extends BaseActivity {
    private static final String TAG = "AssignDriverActivity";
    private AssignDriverDetailRecyclerAdapter mAdapter;
    private AssignDriver assignDriver;

    @Override
    public void onPermissionsGranted(int requestCode) {
        Toast.makeText(this, "Permissions Received.", Toast.LENGTH_LONG).show();
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_assign_driver);

        assignDriver = (getIntent()).getParcelableExtra("assignDetail");

        setupToolbar();
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.rv_assign_driver);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(mLayoutManager);

        List<AssignDriverDetailRecyclerAdapter.Step> steps = new ArrayList<>();
        List<PreOrderSumAssign> preOrderSumAssigns = assignDriver.get_pre_order_sum_assign();
        if (preOrderSumAssigns != null && preOrderSumAssigns.size() > 0) {
            PreOrderSumAssign preOrderSumAssign = preOrderSumAssigns.get(0);
            steps.add(new AssignDriverDetailRecyclerAdapter.Step("Xác nhận nhận đơn hàng", (assignDriver.get_driver_accept() != 0), null));
                steps.add(new AssignDriverDetailRecyclerAdapter.Step("Xác nhận bắt đầu đi lấy hàng (trước 30p)", preOrderSumAssign.get_start_pickup() != 0, null));
            steps.add(new AssignDriverDetailRecyclerAdapter.Step("Đã vào kho", preOrderSumAssign.get_in_warehouse_driver() != 0, null));
            steps.add(new AssignDriverDetailRecyclerAdapter.Step("Đã vào line", preOrderSumAssign.get_in_line_driver() != 0, null));
            steps.add(new AssignDriverDetailRecyclerAdapter.Step("Đã rời line", preOrderSumAssign.get_out_line_driver() != 0, null));
            steps.add(new AssignDriverDetailRecyclerAdapter.Step("Đã rời kho", preOrderSumAssign.get_out_warehouse_driver() != 0, null));
            for (int i = 0; i < assignDriver.get_pre_order_sum_assign().size(); i++) {
                List<PreOrderSumAssign> temp = new ArrayList<>();
                temp.add(assignDriver.get_pre_order_sum_assign().get(i));
                steps.add(new AssignDriverDetailRecyclerAdapter.Step("Điểm giao", preOrderSumAssign.get_in_delivery_driver() != 0, temp));
            }
            steps.add(new AssignDriverDetailRecyclerAdapter.Step("Hoàn thành",preOrderSumAssign.get_time_done() != 0, null));
        }
        mAdapter = new AssignDriverDetailRecyclerAdapter(steps);
        recyclerView.setAdapter(mAdapter);
    }

    public void setupToolbar() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle("Chi tiết chuyến hàng");
        toolbar.setNavigationOnClickListener(v -> onBackPressed());
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return true;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
