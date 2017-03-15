package com.example.dangvanan14.mshiper1.fragment;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.OrderListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.model.Order;

import java.util.ArrayList;
import java.util.List;

public class BoxDetailFragment extends Fragment {
    private static final String ARG_PARAM1 = "param1";
    private RecyclerView recyclerView;
    private OrderListRecyclerAdapter mAdapter;
    private List<Order> listProduct = new ArrayList<>();

    public BoxDetailFragment() {
    }

    public static BoxDetailFragment newInstance() {
        BoxDetailFragment fragment = new BoxDetailFragment();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_box_detail, container, false);

        TextView txtTotal = (TextView) v.findViewById(R.id.totalMoney);
        txtTotal.setText("100000000 VNĐ");

        listProduct.add(new Order("13", "19:00", "19/24 binh thơi"));
        listProduct.add(new Order("3", "19:00", "19/24 binh thơi"));
        listProduct.add(new Order("2", "19:00", "19/24 binh thơi"));
        listProduct.add(new Order("3", "19:00", "19/24 binh thơi"));
        listProduct.add(new Order("4", "19:00", "19/24 binh thơi"));

        recyclerView = (RecyclerView) v.findViewById(R.id.rv_order);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mAdapter = new OrderListRecyclerAdapter(listProduct);
        recyclerView.setAdapter(mAdapter);

        return v;
    }

}
