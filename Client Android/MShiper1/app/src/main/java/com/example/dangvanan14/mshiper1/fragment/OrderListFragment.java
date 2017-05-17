package com.example.dangvanan14.mshiper1.fragment;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.DatePicker;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.OrderListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.adapter.MainPagerAdapter;
import com.example.dangvanan14.mshiper1.adapter.OrderPagerAdapter;
import com.example.dangvanan14.mshiper1.model.Order;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class OrderListFragment extends BaseFragment implements View.OnClickListener {
    private TextView txtNgay;
    List<Order> orders;
    Calendar cal;
    Date dateFinish;

    public static OrderListFragment newInstance(List<Order> orders) {
        OrderListFragment order = new OrderListFragment();
        Bundle args = new Bundle();
        args.putParcelableArrayList("data", (ArrayList<? extends Parcelable>) orders);
        order.setArguments(args);
        return order;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        Bundle args = getArguments();
        orders = args.getParcelableArrayList("data");
        View v = inflater.inflate(R.layout.fragment_orderlist, container, false);
        txtNgay = (TextView) v.findViewById(R.id.btnDate);

        cal = Calendar.getInstance();
        SimpleDateFormat dft = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
        String strDate = dft.format(cal.getTime());
        txtNgay.setText(strDate);

        txtNgay.setOnClickListener(this);

        setupTabLayout(v);
        return v;
    }

    public void setupTabLayout(View v) {
        OrderPagerAdapter mAdapter = new OrderPagerAdapter(getFragmentManager(), orders);
        ViewPager viewPager = (ViewPager) v.findViewById(R.id.orderViewPager);
        viewPager.setAdapter(mAdapter);

        TabLayout tabLayout = (TabLayout) v.findViewById(R.id.orderTabLayout);
        tabLayout.setupWithViewPager(viewPager);

        tabLayout.getTabAt(0).setText("Chờ");
        tabLayout.getTabAt(1).setText("Hoàn thành");
        tabLayout.getTabAt(2).setText("Hủy");
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnDate:
                showDatePickerDialog();
                break;
        }
    }

    public void showDatePickerDialog() {
        DatePickerDialog.OnDateSetListener callback = new DatePickerDialog.OnDateSetListener() {
            public void onDateSet(DatePicker view, int year,
                                  int monthOfYear,
                                  int dayOfMonth) {
                txtNgay.setText(
                        (dayOfMonth) + "/" + (monthOfYear + 1) + "/" + year);
                cal.set(year, monthOfYear, dayOfMonth);
                dateFinish = cal.getTime();
            }
        };
        String s = txtNgay.getText() + "";
        String strArrtmp[] = s.split("/");
        int ngay = Integer.parseInt(strArrtmp[0]);
        int thang = Integer.parseInt(strArrtmp[1]) - 1;
        int nam = Integer.parseInt(strArrtmp[2]);
        DatePickerDialog pic = new DatePickerDialog(
                getContext(),
                callback, nam, thang, ngay);
        pic.setTitle("Chọn ngày");
        pic.show();
    }
}
