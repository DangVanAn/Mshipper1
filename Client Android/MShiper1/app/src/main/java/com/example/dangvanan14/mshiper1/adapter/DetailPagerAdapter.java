package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import com.example.dangvanan14.mshiper1.fragment.OrderFragment;

/**
 * Created by Sherman on 3/7/2017.
 */

public class DetailPagerAdapter extends FragmentStatePagerAdapter{
    public DetailPagerAdapter(FragmentManager fm) {
        super(fm);
    }
    private static final int NUM_ITEMS = 3;
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return OrderFragment.newInstance();
            case 1:
                return OrderFragment.newInstance();
            case 2:
                return OrderFragment.newInstance();
        }
        return null;
    }

    @Override
    public int getCount() {
        return NUM_ITEMS;
    }
}
