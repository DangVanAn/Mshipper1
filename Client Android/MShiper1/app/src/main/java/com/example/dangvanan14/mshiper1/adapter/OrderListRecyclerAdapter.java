package com.example.dangvanan14.mshiper1.adapter;

import android.support.v7.widget.RecyclerView;
import android.view.ViewGroup;

import com.example.dangvanan14.mshiper1.model.Order;

import java.util.List;

/**
 * Created by Sherman on 2/23/2017.
 */
public class OrderListRecyclerAdapter extends RecyclerView.Adapter {
    private List<Order> listOfOrder;

    public OrderListRecyclerAdapter() {
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return null;
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {

    }

    @Override
    public int getItemCount() {
        return 0;
    }


    public OrderListRecyclerAdapter(List<Order> listOfOrder) {
        this.listOfOrder = listOfOrder;
    }
}
