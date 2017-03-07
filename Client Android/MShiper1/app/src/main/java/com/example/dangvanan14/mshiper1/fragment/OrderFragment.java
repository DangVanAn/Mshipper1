package com.example.dangvanan14.mshiper1.fragment;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.DatePicker;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.OrderListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.adapter.OrderPagerAdapter;
import com.example.dangvanan14.mshiper1.model.Order;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 * Created by Sherman on 3/6/2017.
 */

public class OrderFragment extends BaseFragment {
    private List<Order> listOfOrder = new ArrayList<>();
    private OrderListRecyclerAdapter mAdapter;


    public static OrderFragment newInstance() {
        OrderFragment order = new OrderFragment();
        Bundle args = new Bundle();
        args.putInt("data", 123);
        order.setArguments(args);
        return order;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
//        Bundle args = getArguments();
        View v = inflater.inflate(R.layout.fragment_order, container, false);

        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));

        RecyclerView recyclerView = (RecyclerView) v.findViewById(R.id.rv_order);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mAdapter = new OrderListRecyclerAdapter(listOfOrder);
        recyclerView.setAdapter(mAdapter);
        return v;
    }
}
