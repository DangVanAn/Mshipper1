package com.example.dangvanan14.mshiper1.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.MoreRecyclerAdapter;
import com.example.dangvanan14.mshiper1.model.More;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Sherman on 3/6/2017.
 */

public class MoreFragment extends BaseFragment {
    private MoreRecyclerAdapter mAdapter;
    List<More> more;

    public static MoreFragment newInstance() {
        MoreFragment moreFragment = new MoreFragment();
        return moreFragment;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_more, container, false);

        more = new ArrayList<>();
        more.add(new More(1, "Liên hệ"));
        more.add(new More(2, "Các chuyến hàng"));
        more.add(new More(0, "Đăng xuất"));

        RecyclerView recyclerView = (RecyclerView) v.findViewById(R.id.rv_more);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mAdapter = new MoreRecyclerAdapter(more);
        recyclerView.setAdapter(mAdapter);
        return v;
    }
}
