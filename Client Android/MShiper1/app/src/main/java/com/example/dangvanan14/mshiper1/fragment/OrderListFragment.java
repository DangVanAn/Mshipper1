package com.example.dangvanan14.mshiper1.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.OrderListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.model.Order;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Sherman on 2/23/2017.
 */

public class OrderListFragment extends BaseFragment {
    private List<Order> listOfOrder = new ArrayList<>();
    private OrderListRecyclerAdapter mAdapter;

    public static OrderListFragment newInstance() {
        OrderListFragment order = new OrderListFragment();
        Bundle args = new Bundle();
        args.putInt("data", 123);
        order.setArguments(args);
        return order;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        Bundle args = getArguments();

        View v = inflater.inflate(R.layout.fragment_orderlist, container, false);
        Spinner spinner = (Spinner) v.findViewById(R.id.spinner);

        List<String> list = new ArrayList<>();
        list.add("list 1");
        list.add("list 2");
        list.add("list 3");

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_spinner_item, list);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);

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
