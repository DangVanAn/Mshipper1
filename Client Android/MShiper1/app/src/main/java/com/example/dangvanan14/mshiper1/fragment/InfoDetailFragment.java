package com.example.dangvanan14.mshiper1.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
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

/**
 * Created by Sherman on 3/9/2017.
 */

public class InfoDetailFragment extends BaseFragment {
    Order order = new Order("","","",1);
    public static InfoDetailFragment newInstance() {
        InfoDetailFragment order = new InfoDetailFragment();
        return order;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_info_detail, container, false);

        TextView IdDonHang = (TextView)v.findViewById(R.id.IDDonHang);
        TextView IDGoiHang = (TextView)v.findViewById(R.id.IDGoiHang);
        TextView totalMoney = (TextView)v.findViewById(R.id.totalMoney);
        TextView dateRequest = (TextView)v.findViewById(R.id.dateRequest);
        TextView state = (TextView)v.findViewById(R.id.state);


        return v;
    }
}
