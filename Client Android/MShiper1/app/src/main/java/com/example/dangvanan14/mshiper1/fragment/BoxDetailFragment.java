package com.example.dangvanan14.mshiper1.fragment;

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

import java.util.ArrayList;
import java.util.List;

public class BoxDetailFragment extends Fragment {
    private static final String ARG_PARAM1 = "param1";
    private RecyclerView recyclerView;
    private DetailsRecyclerAdapter mAdapter;
    private List<Detail> details = new ArrayList<>();

    public BoxDetailFragment() {
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

        TextView txtTotal = (TextView) v.findViewById(R.id.totalMoney);

        txtTotal.setText("" + Charged(details));

        recyclerView = (RecyclerView) v.findViewById(R.id.rv_order);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mAdapter = new DetailsRecyclerAdapter(details);
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
