package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import com.example.dangvanan14.mshiper1.fragment.BoxDetailFragment;
import com.example.dangvanan14.mshiper1.fragment.Fragment_Maps;
import com.example.dangvanan14.mshiper1.fragment.InfoDetailFragment;
import com.example.dangvanan14.mshiper1.fragment.OrderFragment;
import com.example.dangvanan14.mshiper1.model.Detail;
import com.example.dangvanan14.mshiper1.model.Order;

import java.util.ArrayList;
import java.util.List;

public class DetailPagerAdapter extends FragmentStatePagerAdapter{
    private Order order;
    private List<Detail> details = new ArrayList<>();

    public DetailPagerAdapter(FragmentManager fm, List<Detail> details, Order order) {
        super(fm);
        this.details = details;
        this.order = order;
    }
    private static final int NUM_ITEMS = 3;
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return InfoDetailFragment.newInstance(details, order);
            case 1:
                return BoxDetailFragment.newInstance(details);
            case 2:
                return Fragment_Maps.newInstance();
        }
        return null;
    }

    @Override
    public int getCount() {
        return NUM_ITEMS;
    }
}
