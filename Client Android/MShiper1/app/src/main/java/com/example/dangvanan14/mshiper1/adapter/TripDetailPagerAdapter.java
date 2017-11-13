package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import com.example.dangvanan14.mshiper1.fragment.TripDetailMapFragment;
import com.example.dangvanan14.mshiper1.fragment.TripDetailStepFragment;
import com.example.dangvanan14.mshiper1.model.Trip;

/**
 * Created by Sherman on 3/6/2017.
 */

public class TripDetailPagerAdapter extends FragmentStatePagerAdapter {
    private Trip trip;

    public TripDetailPagerAdapter(FragmentManager fm, Trip trip) {
        super(fm);
        this.trip = trip;
    }

    private static final int NUM_ITEMS = 2;

    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return TripDetailStepFragment.newInstance(trip);
            case 1:
                return TripDetailMapFragment.newInstance(trip);
        }
        return null;
    }

    @Override
    public int getCount() {
        return NUM_ITEMS;
    }
}