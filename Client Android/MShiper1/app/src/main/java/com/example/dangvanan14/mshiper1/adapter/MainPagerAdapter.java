package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.util.Log;

import com.example.dangvanan14.mshiper1.fragment.Fragment_Maps;
import com.example.dangvanan14.mshiper1.fragment.OrderFragment;
import com.example.dangvanan14.mshiper1.fragment.OrderListFragment;
import com.example.dangvanan14.mshiper1.model.Order;

import java.util.List;


/**
 * Created by Sherman on 2/24/2017.
 */
public class MainPagerAdapter extends FragmentStatePagerAdapter {
    List<Order> orders;

    public MainPagerAdapter(FragmentManager fm, List<Order> orders) {
        super(fm);
        this.orders = orders;
    }

    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return OrderListFragment.newInstance(orders);
            case 1:
                return Fragment_Maps.newInstance(orders);
        }
        return null;
    }

    @Override
    public int getCount() {
        return 2;
    }
}