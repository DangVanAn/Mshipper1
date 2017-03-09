package com.example.dangvanan14.mshiper1.fragment;

import android.os.Bundle;
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
 * Created by Sherman on 3/9/2017.
 */

public class InfoDetailFragment extends BaseFragment {
    Order order = new Order("","","");
    public static InfoDetailFragment newInstance() {
        InfoDetailFragment order = new InfoDetailFragment();
//        Bundle args = new Bundle();
//        args.putInt("data", 123);
//        order.setArguments(args);
        return order;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
//        Bundle args = getArguments();
        View v = inflater.inflate(R.layout.fragment_info_detail, container, false);

        return v;
    }
}
