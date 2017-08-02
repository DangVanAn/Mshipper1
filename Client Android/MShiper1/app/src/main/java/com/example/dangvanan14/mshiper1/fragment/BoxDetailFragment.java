package com.example.dangvanan14.mshiper1.fragment;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.DetailsRecyclerAdapter;
import com.example.dangvanan14.mshiper1.adapter.OrderListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.model.Detail;
import com.example.dangvanan14.mshiper1.model.Order;
import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class BoxDetailFragment extends Fragment {
    private RecyclerView recyclerView;
    private DetailsRecyclerAdapter mAdapter;
    private List<Detail> details = new ArrayList<>();
    private TextView txtTotal;

    public interface OnSendDataEventListener {
        public void sendSelectedDetail(ArrayList<String> id_package);
    }

    OnSendDataEventListener onSendDataEventListener;
    OnSendDataEventListener adapterSendDataEventListener = new OnSendDataEventListener() {
        @Override
        public void sendSelectedDetail(ArrayList<String> id_package) {
            float sum = 0;
            for (String s : id_package
                    ) {
                for (Detail d : details
                        ) {
                    if (s == d.get_id_package())
                    {
                        sum += d.get_total_pay();
                    }
                }
            }
            txtTotal.setText("" + sum + getResources().getString(R.string.denomination));

//            Predicate<Detail> predicate = input -> result.getContents().equals(input != null ? input.get_id() : "");
//            Collection<Detail> result2 = Collections2.filter(orders, predicate);
//            List<Detail> order = new ArrayList<>(result2);
        }
    };

    public BoxDetailFragment() {
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        try {
            onSendDataEventListener = (OnSendDataEventListener) context;
        } catch (ClassCastException e) {
            throw new ClassCastException(context.toString() + " must implement onSomeEventListener");
        }
    }

    public static BoxDetailFragment newInstance(List<Detail> details) {
        BoxDetailFragment fragment = new BoxDetailFragment();
        Bundle args = new Bundle();
        args.putParcelableArrayList("data", (ArrayList<? extends Parcelable>) details);
        fragment.setArguments(args);
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
        Bundle args = getArguments();
        details = args.getParcelableArrayList("data");

        txtTotal = (TextView) v.findViewById(R.id.totalMoney);

        txtTotal.setText("" + Charged(details) + getResources().getString(R.string.denomination));

        recyclerView = (RecyclerView) v.findViewById(R.id.rv_order);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mAdapter = new DetailsRecyclerAdapter(getContext(), details, onSendDataEventListener, adapterSendDataEventListener);
        recyclerView.setAdapter(mAdapter);

        return v;
    }

    float Charged(List<Detail> details) {
        float sum = 0;
        for (int i = 0; i < details.size(); i++) {
            sum += details.get(i).get_total_pay();
        }
        return sum;
    }
}
