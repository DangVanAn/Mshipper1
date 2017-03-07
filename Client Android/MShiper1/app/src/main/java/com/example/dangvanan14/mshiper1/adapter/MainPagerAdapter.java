package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import com.example.dangvanan14.mshiper1.fragment.Fragment_Maps;
import com.example.dangvanan14.mshiper1.fragment.OrderFragment;
import com.example.dangvanan14.mshiper1.fragment.OrderListFragment;

import java.util.List;


/**
 * Created by Sherman on 2/24/2017.
 */
public class MainPagerAdapter extends FragmentStatePagerAdapter {
    public MainPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return OrderListFragment.newInstance();
            case 1:
                return OrderFragment.newInstance();
        }
        return null;
    }

    @Override
    public int getCount() {
        return 2;
    }
}