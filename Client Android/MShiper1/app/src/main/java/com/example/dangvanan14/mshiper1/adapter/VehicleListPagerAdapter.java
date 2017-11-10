package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import com.example.dangvanan14.mshiper1.fragment.VehicleStateFragment;

/**
 * Created by Sherman on 3/6/2017.
 */

public class VehicleListPagerAdapter extends FragmentStatePagerAdapter {
    public VehicleListPagerAdapter(FragmentManager fm) {
        super(fm);
    }
    private static final int NUM_ITEMS = 2;
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            //chuẩn bị : 1: vao kho, 2: vao line, 3: ra line, 4: ra kho, 5: den diem giao
            case 0:
                return VehicleStateFragment.newInstance(1);
            case 1:
                return VehicleStateFragment.newInstance(4);
        }
        return null;
    }

    @Override
    public int getCount() {
        return NUM_ITEMS;
    }
}