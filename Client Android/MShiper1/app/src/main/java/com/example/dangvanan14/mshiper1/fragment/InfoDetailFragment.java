package com.example.dangvanan14.mshiper1.fragment;

import android.os.Bundle;
import android.os.Parcelable;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.model.Detail;
import com.example.dangvanan14.mshiper1.model.Order;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class InfoDetailFragment extends BaseFragment {

    private ArrayList<Detail> details;
    private Order order;

    public static InfoDetailFragment newInstance(List<Detail> details, Order order) {
        InfoDetailFragment detail = new InfoDetailFragment();
        Bundle args = new Bundle();
        args.putParcelableArrayList("Details", (ArrayList<? extends Parcelable>) details);
        args.putParcelable("Order", order);
        detail.setArguments(args);
        return detail;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_info_detail, container, false);
        Bundle args = getArguments();
        details = args.getParcelableArrayList("Details");
        order = args.getParcelable("Order");

        TextView idDonHang = (TextView)v.findViewById(R.id.IDDonHang);
        TextView dateCreate = (TextView)v.findViewById(R.id.dateCreate);
        TextView address = (TextView)v.findViewById(R.id.address);
        TextView orderStatus = (TextView)v.findViewById(R.id.orderStatus);
        TextView paymentStatus = (TextView)v.findViewById(R.id.paymentStatus);
        TextView note = (TextView)v.findViewById(R.id.note);

        idDonHang.setText(order.get_id());
        Date date = new Date(order.get_created_date());
        SimpleDateFormat df2 = new SimpleDateFormat("dd/MM/yyyy");
        dateCreate.setText(df2.format(date));
        address.setText(order.get_address());
        orderStatus.setText(order.get_order_status());
        paymentStatus.setText(order.get_payment_status());
        note.setText(order.get_note());

        return v;
    }
}
