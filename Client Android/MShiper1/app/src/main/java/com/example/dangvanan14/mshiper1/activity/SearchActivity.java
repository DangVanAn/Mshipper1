package com.example.dangvanan14.mshiper1.activity;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.OrderListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.model.Order;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Sherman on 3/6/2017.
 */

public class SearchActivity extends BaseActivity implements SearchView.OnQueryTextListener {
    private static final String TAG = "SearchActivity";
    private SearchView searchView;
    private List<Order> listOfOrder = new ArrayList<>();
    private List<Order> resultSearch = new ArrayList<>();

    private OrderListRecyclerAdapter mAdapter;
    private RecyclerView recyclerView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
        listOfOrder.add(new Order("13", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("3", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("2", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("3", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("4", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("5", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("6", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("2", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("2", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("1", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("11", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("123", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("7", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("12", "19:00", "19/24 binh thơi"));
        listOfOrder.add(new Order("11", "19:00", "19/24 binh thơi"));

        recyclerView = (RecyclerView) findViewById(R.id.rv_order);
        recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
        mAdapter = new OrderListRecyclerAdapter(resultSearch);
        recyclerView.setAdapter(mAdapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.search_menu, menu);

        MenuItem searchItem = menu.findItem(R.id.action_search);

        searchView = (SearchView) searchItem.getActionView();
        searchView.setOnQueryTextListener(this);
        searchView.setFocusable(true);
        searchView.setIconified(false);
        searchView.requestFocusFromTouch();
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onQueryTextSubmit(String query) {
        return false;
    }

    @Override
    public boolean onQueryTextChange(String newText) {
        Log.d(TAG, "onQueryTextChange: " + newText);
        resultSearch.clear();
        if (!newText.equals("")) {
            filter(listOfOrder, newText, resultSearch);
        }
        mAdapter.notifyDataSetChanged();
        recyclerView.scrollToPosition(0);

        return true;
    }

    private static List<Order> filter(List<Order> models, String query, List<Order> resultSearch) {
        final String lowerCaseQuery = query.toLowerCase();

        for (Order model : models) {
            final String text = model.getId().toLowerCase();
            if (text.contains(lowerCaseQuery)) {
                resultSearch.add(model);
            }
        }
        return resultSearch;
    }
}
