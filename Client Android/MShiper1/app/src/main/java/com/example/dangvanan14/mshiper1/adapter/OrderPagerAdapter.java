package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.fragment.OrderFragment;
import com.example.dangvanan14.mshiper1.fragment.OrderListFragment;

import java.util.List;

/**
 * Created by Sherman on 3/6/2017.
 */

public class OrderPagerAdapter  extends FragmentStatePagerAdapter {
    private static final int ORDER_TIME = 1;
    private static final int ORDER_OK = 2;
    private static final int ORDER_CANCEL = 3;

    public OrderPagerAdapter(FragmentManager fm) {
        super(fm);
    }
    private static final int NUM_ITEMS = 3;
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return OrderFragment.newInstance(ORDER_TIME);
            case 1:
                return OrderFragment.newInstance(ORDER_OK);
            case 2:
                return OrderFragment.newInstance(ORDER_CANCEL);
        }
        return null;
    }

    @Override
    public int getCount() {
        return NUM_ITEMS;
    }
}