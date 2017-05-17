package com.example.dangvanan14.mshiper1.fragment;

import android.app.DatePickerDialog;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.OrderListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.model.Order;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Sherman on 3/6/2017.
 */

public class OrderFragment extends BaseFragment {
    private OrderListRecyclerAdapter mAdapter;
    List<Order> orders;

    public static OrderFragment newInstance(int state, List<Order> orders) {
        OrderFragment order = new OrderFragment();
        Bundle args = new Bundle();
        args.putInt("state", state);
        args.putParcelableArrayList("data", (ArrayList<? extends Parcelable>) orders);
        order.setArguments(args);
        return order;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        Bundle args = getArguments();
        int state = args.getInt("state");
        orders = args.getParcelableArrayList("data");

        View v = inflater.inflate(R.layout.fragment_order, container, false);
        if (state == 2)
            v.setBackgroundColor(Color.parseColor("#C8E6C9"));
        else if (state == 3)
            v.setBackgroundColor(Color.parseColor("#FFCDD2"));

        RecyclerView recyclerView = (RecyclerView) v.findViewById(R.id.rv_order);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mAdapter = new OrderListRecyclerAdapter(orders);
        recyclerView.setAdapter(mAdapter);
        return v;
    }
}
