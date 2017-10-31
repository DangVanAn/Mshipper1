package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import com.example.dangvanan14.mshiper1.fragment.AssignDriverDetailMapFragment;
import com.example.dangvanan14.mshiper1.fragment.AssignDriverDetailStepFragment;
import com.example.dangvanan14.mshiper1.model.AssignDriver;

/**
 * Created by Sherman on 3/6/2017.
 */

public class AssignDriverDetailPagerAdapter extends FragmentStatePagerAdapter {
    private AssignDriver assignDriver;

    public AssignDriverDetailPagerAdapter(FragmentManager fm, AssignDriver assignDriver) {
        super(fm);
        this.assignDriver = assignDriver;
    }

    private static final int NUM_ITEMS = 2;

    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return AssignDriverDetailStepFragment.newInstance(assignDriver);
            case 1:
                return AssignDriverDetailMapFragment.newInstance(assignDriver);
        }
        return null;
    }

    @Override
    public int getCount() {
        return NUM_ITEMS;
    }
}