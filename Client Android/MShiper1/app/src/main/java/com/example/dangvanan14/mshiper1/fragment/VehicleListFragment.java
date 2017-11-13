package com.example.dangvanan14.mshiper1.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.VehicleListPagerAdapter;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.application.DefinedApp;

public class VehicleListFragment extends BaseFragment{

    public static VehicleListFragment newInstance() {
        VehicleListFragment vehicleListFragment = new VehicleListFragment();
        Bundle args = new Bundle();
        vehicleListFragment.setArguments(args);
        return vehicleListFragment;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        Bundle args = getArguments();

        View v = inflater.inflate(R.layout.fragment_vehicle_list, container, false);

        setupTabLayout(v);
        return v;
    }

    public void setupTabLayout(View v) {
        VehicleListPagerAdapter mAdapter = new VehicleListPagerAdapter(getFragmentManager());
        ViewPager viewPager = (ViewPager) v.findViewById(R.id.vehicleListViewPager);
        viewPager.setAdapter(mAdapter);

        TabLayout tabLayout = (TabLayout) v.findViewById(R.id.vehicleListLayout);
        tabLayout.setupWithViewPager(viewPager);

        tabLayout.getTabAt(0).setText(App.getRoleUser() == DefinedApp.ROLE.GUARD ? "Vào Kho" : "Vào Line");
        tabLayout.getTabAt(1).setText(App.getRoleUser() == DefinedApp.ROLE.GUARD ? "Ra Kho" : "Rời Line");
    }
}
