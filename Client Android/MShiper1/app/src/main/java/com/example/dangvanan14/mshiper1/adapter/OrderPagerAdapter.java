package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import com.example.dangvanan14.mshiper1.fragment.OrderFragment;
import com.example.dangvanan14.mshiper1.model.Order;

import java.util.List;

/**
 * Created by Sherman on 3/6/2017.
 */

public class OrderPagerAdapter  extends FragmentStatePagerAdapter {
    private static final int ORDER_TIME = 1;
    private static final int ORDER_OK = 2;
    private static final int ORDER_CANCEL = 3;
    private List<Order> orders;

    public OrderPagerAdapter(FragmentManager fm, List<Order> orders) {
        super(fm);
        this.orders = orders;

    }
    private static final int NUM_ITEMS = 3;
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return OrderFragment.newInstance(ORDER_TIME, orders);
            case 1:
                return OrderFragment.newInstance(ORDER_OK, orders);
            case 2:
                return OrderFragment.newInstance(ORDER_CANCEL, orders);
        }
        return null;
    }

    @Override
    public int getCount() {
        return NUM_ITEMS;
    }
}