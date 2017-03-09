package com.example.dangvanan14.mshiper1.fragment;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.dangvanan14.mshiper1.R;

public class BoxDetailFragment extends Fragment {
    private static final String ARG_PARAM1 = "param1";

    private String mParam1;

    public BoxDetailFragment() {
    }

    public static BoxDetailFragment newInstance() {
        BoxDetailFragment fragment = new BoxDetailFragment();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_box_detail, container, false);
        return v;
    }

}
